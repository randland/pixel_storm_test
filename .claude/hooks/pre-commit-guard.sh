#!/bin/bash
# Pre-commit check - reminds to run lint/test and update progress

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# Only trigger for git commit commands
if echo "$COMMAND" | grep -q "git commit"; then
  cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "additionalContext": "📝 **Pre-Commit Checklist:**\n1. \`npm run lint\` - Did linting pass?\n2. \`npm run test:run\` - Did tests pass?\n3. \`/demo-test\` - Any console errors in demos?\n4. Should learning progress be updated?\n5. Use \`/commit-learning\` for educational commit format."
  }
}
EOF
fi

exit 0
