import React from "react";

const BlockNoteRenderer = ({ content }) => {
  if (!content) return null;

  let blocks = [];
  try {
    blocks = typeof content === "string" ? JSON.parse(content) : content;
  } catch (e) {
    return <p className="text-red-500">Gagal memuat konten teks.</p>;
  }

  if (!Array.isArray(blocks)) return null;

  // 🎯 Alignment handler
  const getTextAlign = (align) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getFlexAlign = (align) => {
    switch (align) {
      case "center":
        return "flex justify-center";
      case "right":
        return "flex justify-end";
      default:
        return "flex justify-start";
    }
  };

  const renderInlineContent = (inlineContent) => {
    if (!inlineContent || !Array.isArray(inlineContent)) return null;

    return inlineContent.map((item, index) => {
      if (item.type === "text") {
        let classes = "";
        if (item.styles?.bold) classes += "font-bold ";
        if (item.styles?.italic) classes += "italic ";
        if (item.styles?.underline) classes += "underline ";
        if (item.styles?.strike) classes += "line-through ";

        return (
          <span key={index} className={classes}>
            {item.text}
          </span>
        );
      }
      return null;
    });
  };

  // 🔥 HANDLE LIST GROUPING
  const renderBlocks = () => {
    const elements = [];
    let listBuffer = [];
    let listType = null;

    const flushList = () => {
      if (listBuffer.length > 0) {
        const ListTag = listType === "bullet" ? "ul" : "ol";
        elements.push(
          <ListTag
            key={`list-${elements.length}`}
            className={`ml-6 mb-4 ${
              listType === "bullet" ? "list-disc" : "list-decimal"
            }`}
          >
            {listBuffer}
          </ListTag>,
        );
        listBuffer = [];
        listType = null;
      }
    };

    blocks.forEach((block, index) => {
      const key = block.id || index;
      const align = block.props?.textAlignment || "left";
      const textAlignClass = getTextAlign(align);

      switch (block.type) {
        case "paragraph":
          flushList();
          elements.push(
            <p
              key={key}
              className={`leading-relaxed text-[15px] sm:text-base mb-2 ${textAlignClass}`}
            >
              {renderInlineContent(block.content)}
            </p>,
          );
          break;

        case "heading":
          flushList();
          const level = block.props?.level || 1;
          const HeadingTag = `h${level}`;
          elements.push(
            <HeadingTag
              key={key}
              className={`font-black text-[#01002A] mt-6 mb-2 ${textAlignClass} ${
                level === 1 ? "text-3xl" : level === 2 ? "text-2xl" : "text-xl"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {renderInlineContent(block.content)}
            </HeadingTag>,
          );
          break;

        case "bulletListItem":
        case "numberedListItem":
          const currentType =
            block.type === "bulletListItem" ? "bullet" : "numbered";

          if (listType && listType !== currentType) {
            flushList();
          }

          listType = currentType;

          listBuffer.push(
            <li key={key} className={`leading-relaxed mb-1 ${textAlignClass}`}>
              {renderInlineContent(block.content)}
            </li>,
          );
          break;

        case "image":
          flushList();
          const flexAlign = getFlexAlign(align);

          elements.push(
            <div key={key} className={`my-6 ${flexAlign}`}>
              <img
                src={block.props?.url}
                alt={block.props?.name || "Post content"}
                className="rounded-xl max-w-[60%] object-cover bg-gray-100"
              />
              {block.props?.caption && (
                <p className="text-sm text-gray-400 mt-2 text-center">
                  {block.props.caption}
                </p>
              )}
            </div>,
          );
          break;

        default:
          flushList();
          break;
      }
    });

    flushList();

    return elements;
  };

  return (
    <div
      className="flex flex-col gap-4 text-gray-800"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {renderBlocks()}
    </div>
  );
};

export default BlockNoteRenderer;
