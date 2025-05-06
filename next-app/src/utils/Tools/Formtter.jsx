import React from 'react';
import InlineBlock from "@/utils/Tools/InlineBlock";
import ExternalLink from "@/utils/Tools/ExternalLink";
import ImageBlock from "@/utils/Tools/ImageBlock";

export const formatText = (raw) => {
  if (!raw || typeof raw !== "string") return raw?.toString() || '';

  const result = [];
  let remaining = raw;
  let key = 0;

  const patterns = [
    { regex: /^\*\*\*(.+?)\*\*\*/, type: "bolditalic" },
    { regex: /^\*\*(.+?)\*\*/, type: "bold" },
    { regex: /^\*(.+?)\*/, type: "italic" },
    { regex: /^`(.+?)`/, type: "code" },
    { regex: /^!\[([^\]]+)\]\(([^)]+)\)/, type: "image" },
    { regex: /^\[([^\]]+)\]\(([^)]+)\)/, type: "link" },
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const { regex, type } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        if (remaining.indexOf(match[0]) > 0) {
          result.push(<React.Fragment key={key++}>{remaining.slice(0, remaining.indexOf(match[0]))}</React.Fragment>);
        }

        switch (type) {
          case "bolditalic":
            result.push(<strong key={key++}><em>{match[1]}</em></strong>);
            break;
          case "bold":
            result.push(<strong key={key++}>{match[1]}</strong>);
            break;
          case "italic":
            result.push(<em key={key++}>{match[1]}</em>);
            break;
          case "code":
            result.push(<InlineBlock key={key++} text={match[1]}/>);
            break;
          case "image":
            result.push(<ImageBlock key={key++} imgsrc={match[2]} />);
            break;
          case "link":
            result.push(<ExternalLink key={key++} link={match[2]} title={match[1]} />);
            break;
        }

        remaining = remaining.slice(remaining.indexOf(match[0]) + match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      result.push(<React.Fragment key={key++}>{remaining[0]}</React.Fragment>);
      remaining = remaining.slice(1);
    }
  }

  return result;
};
