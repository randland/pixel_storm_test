#!/bin/bash
# Smarter test reminder - only triggers for Vue/Three.js files

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // ""')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')

# Only trigger for Vue components or Three.js-related files
if [[ "$FILE_PATH" == *".vue" ]] || [[ "$FILE_PATH" == *"three"* ]] || [[ "$FILE_PATH" == *"shader"* ]]; then
  cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "⚡ Graphics code modified ($FILE_PATH). Run \`/demo-test\` to check for console errors before committing."
  }
}
EOF
fi

exit 0
