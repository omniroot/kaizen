import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// Common node imports required by the markdown transformers / rich-text
import { CodeNode } from "@lexical/code";
import {
  $convertToMarkdownString,
  $convertFromMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
// import { ImageNode } from "@lexical/image";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import "./TextEditor.css";
import { useCallback, useEffect, useState } from "react";

const theme = {
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
    h6: "editor-heading-h6",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listItem",
    listitemChecked: "editor-listItemChecked",
    listitemUnchecked: "editor-listItemUnchecked",
  },
  hashtag: "editor-hashtag",
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-textBold",
    code: "editor-textCode",
    italic: "editor-textItalic",
    strikethrough: "editor-textStrikethrough",
    subscript: "editor-textSubscript",
    superscript: "editor-textSuperscript",
    underline: "editor-textUnderline",
    underlineStrikethrough: "editor-textUnderlineStrikethrough",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error);
}

function LoadMarkdownListener({
  onLoad,
}: {
  onLoad: (editor: any) => void;
}): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    function handler() {
      onLoad(editor);
    }
    window.addEventListener("lexical-load-markdown", handler);
    return () => window.removeEventListener("lexical-load-markdown", handler);
  }, [editor, onLoad]);

  return null;
}

const initialMarkdown = `# Пример редактора\n\nПечатай \`#\` для заголовка, \`-\` для списка, \`\`\` для блока кода и т.д.\n\n**bold**, *italic*, \`inline code\`\n`;

export const TextEditor = () => {
  const [markdown, setMarkdown] = useState<string>(initialMarkdown);
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    nodes: [
      HeadingNode,
      QuoteNode,
      CodeNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      // ImageNode,
      HorizontalRuleNode,
    ],
    onError,
  };

  const loadMarkdown = useCallback(
    // @ts-ignore
    (editor) => {
      editor.update(() => {
        $convertFromMarkdownString(markdown, TRANSFORMERS);
      });
    },
    [markdown]
  );
  // @ts-ignore
  const handleEditorChange = useCallback((editorState, editor) => {
    // read the editor state and generate markdown string
    editorState.read(() => {
      try {
        const md = $convertToMarkdownString(TRANSFORMERS);
        setMarkdown(md);
      } catch (err) {
        // conversion can fail if nodes are missing; swallow errors for robustness
        // but log so developer can debug.
        // eslint-disable-next-line no-console
        console.warn("markdown-conversion-failed", err);
      }
    });
  }, []);

  return (
    <div className="edtor-container">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          placeholder={
            <div className="editor-placeholder">Enter some text...</div>
          }
          contentEditable={
            <ContentEditable
              className="editor"
              width={"100%"}
              height={"100%"}
              // aria-placeholder={"Enter some text..."}
              // placeholder={<div>Enter some text...</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <OnChangePlugin onChange={handleEditorChange} />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <LoadMarkdownListener onLoad={(editor) => loadMarkdown(editor)} />
      </LexicalComposer>
    </div>
  );
};
