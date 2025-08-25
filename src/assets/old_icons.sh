#!/bin/bash

# Получить текущую директорию скрипта
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Укажите директорию с иконками относительно местоположения скрипта
DIRECTORY="$SCRIPT_DIR/icons"

# Перейти в указанную директорию
cd "$DIRECTORY" || exit

# Создать файл для экспорта
OUTPUT_FILE="$SCRIPT_DIR/icons.tsx"

# Очистить файл перед записью
> "$OUTPUT_FILE"


# Функция для преобразования имени файла в формат экспорта
convert_to_export_name() {
  local name="$1"
  echo "$name" | sed -E 's/[-_]+/ /g; s/(^| )([a-z])/\U\2/g; s/ //g'
}

# Перебрать все файлы в директории
for file in *; do
  if [ -f "$file" ]; then
    filename="${file%.*}"
    export_name=$(convert_to_export_name "$filename")
    
    # Записать строку экспорта в файл
    echo "export { default as ${export_name}Icon } from './icons/$file?react';" >> "$OUTPUT_FILE"
  fi
done


# Удалить последнюю запятую перед закрывающей скобкой массива
sed -i '$ s/,$//' "$OUTPUT_FILE"

echo "Экспорт завершен. Проверьте файл $OUTPUT_FILE."
