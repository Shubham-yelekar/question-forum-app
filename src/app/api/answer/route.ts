import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/stores/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, AppwriteException } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    const { questionId, answer, authorId } = await request.json();
    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        authorId: authorId,
        questionId: questionId,
      },
    );

    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });
    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    let message = "Error creating answer";
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

export async function DELETE(request: NextRequest) {
  try {
    const { answerId } = await request.json();

    const answer = await databases.getDocument(db, answerCollection, answerId);
    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId,
    );

    const prefs = await users.getPrefs<UserPrefs>(answer.authorId);
    await users.updatePrefs(answer.authorId, {
      reputation: Number(prefs.reputation) - 1,
    });
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error: unknown) {
    let message = "Error deleting answers";
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
