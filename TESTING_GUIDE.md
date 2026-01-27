# Testing Your Vote API - Quick Reference

## Files Created

1. **route.test.ts** - Testing strategy guide with 11 test scenarios
2. **route.examples.test.ts** - Complete implementation examples you can copy

## Run Your Tests

```bash
# Run vote tests
npm test -- src/app/api/vote/route.test.ts

# Watch mode (auto-rerun on changes)
npm test -- --watch

# See test coverage
npm test -- --coverage
```

---

## 5 Key Scenarios to Test

### ✅ Scenario 1: Create First Vote

**Input:** User votes upvote/downvote for the first time
**Expected:**

- Vote is created in database
- Author reputation changes (+1 for upvote, -1 for downvote)
- Response: 201 "Voted"

### ✅ Scenario 2: Remove Vote

**Input:** User clicks same vote button again
**Expected:**

- Existing vote is deleted
- Reputation change reversed
- Response: 200 "vote handled"

### ✅ Scenario 3: Change Vote

**Input:** User changes upvote → downvote
**Expected:**

- Old vote deleted
- New vote created
- Reputation changes applied twice
- Response: 201 "Vote Status Updated"

### ✅ Scenario 4: Vote Calculation

**Input:** Query vote counts
**Expected:**

- voteResult = upvotes.total - downvotes.total
- Example: 5 upvotes - 2 downvotes = 3

### ✅ Scenario 5: Error Handling

**Input:** Database error occurs
**Expected:**

- Graceful error response
- Correct HTTP status codes
- Error message returned

---

## Test Structure (AAA Pattern)

```typescript
test("should do something", async () => {
  // ARRANGE: Setup mocks
  mockDatabase.mockResolvedValueOnce({
    /* ... */
  });

  // ACT: Call the API
  const response = await POST(request);

  // ASSERT: Verify behavior
  expect(response.status).toBe(201);
  expect(mockDatabase).toHaveBeenCalled();
});
```

---

## What Needs Mocking

| Dependency      | What to Mock                                                               | Example                       |
| --------------- | -------------------------------------------------------------------------- | ----------------------------- |
| `databases`     | `listDocuments()`, `getDocument()`, `createDocument()`, `deleteDocument()` | Returns documents or updates  |
| `users`         | `getPrefs()`, `updatePrefs()`                                              | Returns/updates reputation    |
| `node-appwrite` | `ID.unique()`, `Query.equal()`                                             | Returns IDs and query filters |

---

## Common Assertions

```typescript
// Status codes
expect(response.status).toBe(201); // Created
expect(response.status).toBe(200); // OK
expect(response.status).toBe(500); // Error

// Function calls
expect(mockDatabase.createDocument).toHaveBeenCalled();
expect(mockUsers.updatePrefs).toHaveBeenCalledWith("user-id", {
  reputation: 11,
});

// Return values
expect(response.message).toBe("Voted");
expect(response.data.voteResult).toBe(5);
```

---

## Next: Test Your Other Routes

Apply the same pattern to:

- **POST /api/answer** - Create answers
- **POST /api/question** - Create questions
- Any other API routes you have

The strategy stays the same:

1. Mock external dependencies
2. Arrange test data
3. Call the route handler
4. Assert the response & side effects

---

## Pro Tips

✅ **Test behavior, not implementation**

- Don't test that `databases.listDocuments()` was called with exact parameters
- Test that "vote was created" and "reputation increased"

✅ **Mock external calls**

- Appwrite, APIs, databases should always be mocked
- Tests should run without hitting real services

✅ **Use realistic data**

- Use IDs and values similar to your actual app
- Test edge cases (reputation 0, null votes, etc.)

✅ **Keep tests focused**

- One test = one scenario
- Don't test multiple things in one test

✅ **Run tests often**

- npm test --watch while developing
- Catch bugs immediately

---

## Common Issues & Solutions

### Issue: "Cannot find module"

**Solution:** Ensure path aliases are in jest.config.ts

```typescript

moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/src/$1",
}
```

### Issue: "nextRequest is not defined"

**Solution:** Add to jest.setup.ts

```typescript
import { Readable } from "stream";
Object.assign(global, { ReadableStream: Readable });
```

### Issue: "Mock not working"

**Solution:** Mock BEFORE importing the route

```typescript
jest.mock("@/models/server/config");
import { POST } from "./route"; // After mocking
```

---

## Learning Resources

- 📖 [Jest Documentation](https://jestjs.io/)
- 📖 [Testing Library Docs](https://testing-library.com/)
- 📖 [Jest Mocking Guide](https://jestjs.io/docs/mock-functions)
