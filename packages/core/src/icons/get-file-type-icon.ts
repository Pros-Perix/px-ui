import type React from "react";
import PdfIcon from "./pdf-icon";
import WordIcon from "./word-icon";
import ExcelIcon from "./excel-icon";
import ImageFileIcon from "./image-file-icon";
import VideoIcon from "./video-icon";
import AudioIcon from "./audio-icon";
import ArchiveIcon from "./archive-icon";
import CodeFileIcon from "./code-file-icon";
import TextFileIcon from "./text-file-icon";
import GenericFileIcon from "./generic-file-icon";

type FileInfo = {
  name: string;
  type?: string;
};

type IconComponent = React.ComponentType<React.ComponentProps<"svg">>;

const extensionMap: Record<string, IconComponent> = {
  // PDF
  pdf: PdfIcon,

  // Word documents
  doc: WordIcon,
  docx: WordIcon,
  rtf: WordIcon,
  odt: WordIcon,

  // Excel/spreadsheets
  xls: ExcelIcon,
  xlsx: ExcelIcon,
  csv: ExcelIcon,
  ods: ExcelIcon,

  // Images
  png: ImageFileIcon,
  jpg: ImageFileIcon,
  jpeg: ImageFileIcon,
  gif: ImageFileIcon,
  webp: ImageFileIcon,
  svg: ImageFileIcon,
  bmp: ImageFileIcon,
  ico: ImageFileIcon,
  tiff: ImageFileIcon,
  tif: ImageFileIcon,

  // Video
  mp4: VideoIcon,
  webm: VideoIcon,
  mov: VideoIcon,
  avi: VideoIcon,
  mkv: VideoIcon,
  wmv: VideoIcon,
  flv: VideoIcon,

  // Audio
  mp3: AudioIcon,
  wav: AudioIcon,
  ogg: AudioIcon,
  flac: AudioIcon,
  aac: AudioIcon,
  m4a: AudioIcon,
  wma: AudioIcon,

  // Archives
  zip: ArchiveIcon,
  rar: ArchiveIcon,
  "7z": ArchiveIcon,
  tar: ArchiveIcon,
  gz: ArchiveIcon,
  bz2: ArchiveIcon,

  // Code
  js: CodeFileIcon,
  jsx: CodeFileIcon,
  ts: CodeFileIcon,
  tsx: CodeFileIcon,
  json: CodeFileIcon,
  html: CodeFileIcon,
  css: CodeFileIcon,
  scss: CodeFileIcon,
  less: CodeFileIcon,
  py: CodeFileIcon,
  rb: CodeFileIcon,
  java: CodeFileIcon,
  c: CodeFileIcon,
  cpp: CodeFileIcon,
  h: CodeFileIcon,
  go: CodeFileIcon,
  rs: CodeFileIcon,
  php: CodeFileIcon,
  sql: CodeFileIcon,
  sh: CodeFileIcon,
  bash: CodeFileIcon,
  yml: CodeFileIcon,
  yaml: CodeFileIcon,
  xml: CodeFileIcon,

  // Text
  txt: TextFileIcon,
  md: TextFileIcon,
  markdown: TextFileIcon,
  log: TextFileIcon,
};

const mimeTypeMap: Record<string, IconComponent> = {
  "application/pdf": PdfIcon,

  // Word
  "application/msword": WordIcon,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    WordIcon,
  "application/rtf": WordIcon,
  "application/vnd.oasis.opendocument.text": WordIcon,

  // Excel
  "application/vnd.ms-excel": ExcelIcon,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    ExcelIcon,
  "text/csv": ExcelIcon,
  "application/vnd.oasis.opendocument.spreadsheet": ExcelIcon,

  // Archives
  "application/zip": ArchiveIcon,
  "application/x-rar-compressed": ArchiveIcon,
  "application/x-7z-compressed": ArchiveIcon,
  "application/x-tar": ArchiveIcon,
  "application/gzip": ArchiveIcon,

  // Code
  "application/javascript": CodeFileIcon,
  "application/typescript": CodeFileIcon,
  "application/json": CodeFileIcon,
  "text/html": CodeFileIcon,
  "text/css": CodeFileIcon,
  "application/xml": CodeFileIcon,
  "text/xml": CodeFileIcon,

  // Text
  "text/plain": TextFileIcon,
  "text/markdown": TextFileIcon,
};

/**
 * Get the appropriate file type icon component for a file.
 * Uses MIME type first, then falls back to file extension.
 *
 * @param file - Object with name and optional type (MIME type)
 * @returns React icon component for the file type
 *
 * @example
 * ```tsx
 * import { getFileTypeIcon } from "@px-ui/core";
 *
 * const Icon = getFileTypeIcon({ name: "document.pdf", type: "application/pdf" });
 * <Icon className="size-5" />
 * ```
 */
export function getFileTypeIcon(file: FileInfo): IconComponent {
  // Check MIME type first
  if (file.type) {
    // Handle image/* types
    if (file.type.startsWith("image/")) {
      return ImageFileIcon;
    }
    // Handle video/* types
    if (file.type.startsWith("video/")) {
      return VideoIcon;
    }
    // Handle audio/* types
    if (file.type.startsWith("audio/")) {
      return AudioIcon;
    }

    // Check specific MIME type mapping
    const mimeIcon = mimeTypeMap[file.type];
    if (mimeIcon) {
      return mimeIcon;
    }
  }

  // Fall back to file extension
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension) {
    const extIcon = extensionMap[extension];
    if (extIcon) {
      return extIcon;
    }
  }

  // Default fallback
  return GenericFileIcon;
}
