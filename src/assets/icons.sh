#!/bin/bash

# Get the current directory of the script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Specify the directory containing the icons
DIRECTORY="$SCRIPT_DIR/icons"

# Specify the output TypeScript file for icon names
OUTPUT_FILE="$SCRIPT_DIR/iconNames.ts"

# Check if the icons directory exists
if [ ! -d "$DIRECTORY" ]; then
  echo "Error: Directory $DIRECTORY does not exist."
  exit 1
fi

# Clear the output file before writing
> "$OUTPUT_FILE"

# Write the TypeScript type definition
echo "export type IKaizenIconNames =" >> "$OUTPUT_FILE"

# Iterate over all SVG files in the directory
for file in "$DIRECTORY"/*.svg; do
  if [ -f "$file" ]; then
    filename=$(basename "$file" .svg)
    echo "  | '$filename'" >> "$OUTPUT_FILE"
  fi
done

# Append a semicolon to close the type definition
echo ";" >> "$OUTPUT_FILE"

# Check if any icon names were found
if [ ! -s "$OUTPUT_FILE" ]; then
  echo "No SVG files found in $DIRECTORY. Generating empty type."
  echo "export type IconName = never;" > "$OUTPUT_FILE"
fi

echo "Type generation completed. Check $OUTPUT_FILE."