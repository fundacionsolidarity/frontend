interface ContentChild {
  type: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface ContentBlock {
  type: string; 
  children: ContentChild[];
  format?: string; 
  level?: number; 
}

export const renderRichText = (contentBlocks: ContentBlock[]) => {
  return contentBlocks.map((block, blockIndex) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={blockIndex} className="mb-4 leading-relaxed text-gray-700 text-base md:text-lg">
            {block.children.map((child, childIndex) => {
              let textElement: React.ReactNode = child.text;
              if (child.bold) {
                textElement = <strong key={childIndex}>{textElement}</strong>;
              }
              if (child.italic) {
                textElement = <em key={`em-${childIndex}`}>{textElement}</em>;
              }
              if (child.underline) {
                textElement = <u key={`u-${childIndex}`}>{textElement}</u>;
              }
              return textElement;
            })}
          </p>
        );
      default:
        return (
          <p key={blockIndex} className="mb-4 leading-relaxed text-gray-700 text-base md:text-lg">
            {block.children.map(child => child.text).join('')}
          </p>
        );
    }
  });
};