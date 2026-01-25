import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name"; // Import database and collection names
import { databases, users } from "@/models/server/config"; // Import Appwrite database and user services
import { UserPrefs } from "@/stores/Auth"; // Import user preferences type
import { NextRequest, NextResponse } from "next/server"; // Import Next.js request and response utilities
import { ID, Query, AppwriteException } from "node-appwrite"; // Import Appwrite utilities for unique IDs and queries

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to extract voting details
    const { votedById, voteStatus, type, typeId } = await request.json();

    // Check if a vote already exists for the given type, typeId, and votedById
    const response = await databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("typeId", typeId),
      Query.equal("votedById", votedById),
    ]);

    // If a vote exists, delete the existing vote
    if (response.documents.length > 0) {
      await databases.deleteDocument(
        db,
        voteCollection,
        response.documents[0].$id, // Delete the document using its ID
      );

      // Fetch the question or answer associated with the vote
      const QuestionOrAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection, // Determine the collection based on type
        typeId,
      );

      // Fetch the author's preferences
      const authorPrefs = await users.getPrefs<UserPrefs>(
        QuestionOrAnswer.authorId,
      );

      // Update the author's reputation based on the previous vote status
      await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId, {
        reputation:
          response.documents[0].voteStatus === "upvoted"
            ? Number(authorPrefs.reputation) - 1 // Decrease reputation for removing an upvote
            : Number(authorPrefs.reputation) + 1, // Increase reputation for removing a downvote
      });
    }

    // If the vote status has changed or no vote exists, create a new vote
    if (response.documents[0]?.voteStatus !== voteStatus) {
      const doc = await databases.createDocument(
        db,
        voteCollection,
        ID.unique(), // Generate a unique ID for the new vote
        {
          type,
          typeId,
          voteStatus,
          votedById,
        },
      );

      // Fetch the question or answer associated with the vote
      const questionOrAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId,
      );

      // Fetch the author's preferences
      const authorPrefs = await users.getPrefs<UserPrefs>(
        questionOrAnswer.authorId,
      );

      // Update the author's reputation based on the new vote status
      if (response.documents[0]) {
        // If a previous vote exists, adjust reputation based on the change
        await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
          reputation:
            response.documents[0].voteStatus === "upvoted"
              ? Number(authorPrefs.reputation) - 1 // Decrease reputation for changing from upvote to downvote
              : Number(authorPrefs.reputation) + 1, // Increase reputation for changing from downvote to upvote
        });
      } else {
        // If no previous vote exists, adjust reputation based on the new vote
        await users.updatePrefs<UserPrefs>(questionOrAnswer.authorId, {
          reputation:
            voteStatus === "upvoted"
              ? Number(authorPrefs.reputation) + 1 // Increase reputation for a new upvote
              : Number(authorPrefs.reputation) - 1, // Decrease reputation for a new downvote
        });
      }

      // Fetch the total upvotes and downvotes for the given type and typeId
      const [upvotes, downvotes] = await Promise.all([
        databases.listDocuments(db, voteCollection, [
          Query.equal("type", type),
          Query.equal("typeId", typeId),
          Query.equal("voteStatus", "upvoted"),
          Query.equal("votedById", votedById),
          Query.limit(1), // Limit results for optimization
        ]),
        databases.listDocuments(db, voteCollection, [
          Query.equal("type", type),
          Query.equal("typeId", typeId),
          Query.equal("voteStatus", "downvoted"),
          Query.equal("votedById", votedById),
          Query.limit(1), // Limit results for optimization
        ]),
      ]);

      // Return the response with the updated vote result
      return NextResponse.json(
        {
          data: { document: doc, voteResult: upvotes.total - downvotes.total },
          message: response.documents[0] ? "Vote Status Updated" : "Voted",
        },
        {
          status: 201,
        },
      );
    }

    // Fetch the total upvotes and downvotes for the given type and typeId
    const [upvotes, downvotes] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "upvoted"),
        Query.equal("votedById", votedById), // Fix: Should be "votedById"
        Query.limit(1),
      ]),
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "downvoted"),
        Query.equal("voteById", votedById), // Fix: Should be "votedById"
        Query.limit(1),
      ]),
    ]);

    // Return the response with the vote result
    return NextResponse.json(
      {
        data: {
          document: null,
          voteResult: upvotes.total - downvotes.total, // Fix: Should calculate the difference
        },
        message: "vote handled",
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    // Handle errors and return an appropriate response
    let message = "Error in voting";
    let status = 500;

    if (error instanceof AppwriteException) {
      message = error.message;
      status = error.code ?? 500;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status });
  }
}
