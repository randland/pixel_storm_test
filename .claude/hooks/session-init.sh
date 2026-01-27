#!/bin/bash
# Automatically inject learning progress at session start

PROGRESS_FILE="$CLAUDE_PROJECT_DIR/docs/learning-progress.md"
TRACKING_FILE="$CLAUDE_PROJECT_DIR/docs/context-modules/progress-tracking.md"

# Get current status (first 50 lines of progress)
PROGRESS=$(head -50 "$PROGRESS_FILE" 2>/dev/null || echo "Progress file not found")

# Get spaced repetition schedule (if tracking file exists)
if [ -f "$TRACKING_FILE" ]; then
  SCHEDULE=$(grep -A 20 "Skill Mastery" "$TRACKING_FILE" 2>/dev/null || echo "")
else
  SCHEDULE=""
fi

# Output context injection as JSON
cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "## 📚 Learning Session Initialized\n\n### Current Progress\n$PROGRESS\n\n### Spaced Repetition Status\n$SCHEDULE\n\nReady to continue learning. Consider if any concepts need review before introducing new material."
  }
}
EOF

exit 0
