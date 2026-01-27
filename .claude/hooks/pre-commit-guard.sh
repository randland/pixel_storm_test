#!/bin/bash
# Pre-commit check - reminds to test and update progress

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# Only trigger for git commit commands
if echo "$COMMAND" | grep -q "git commit"; then
  cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "additionalContext": "📝 Before committing:\n1. Have demos been tested with \`/demo-test\`?\n2. Should learning progress be updated?\n3. Consider using \`/commit-learning\` for educational commit format."
  }
}
EOF
fi

exit 0
