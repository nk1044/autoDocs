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
    { regex: /\*\*\*(.+?)\*\*\*/, type: "bolditalic" },
    { regex: /\*\*(.+?)\*\*/, type: "bold" },
    { regex: /\*(.+?)\*/, type: "italic" },
    { regex: /`(.+?)`/, type: "code" },
    { regex: /!\[([^\]]+)\]\(([^)]+)\)/, type: "image" },
    { regex: /\[([^\]]+)\]\(([^)]+)\)/, type: "link" },
    { regex: /--- (.+)/, type: "linebreak" },
  ];

  while (remaining.length > 0) {
    let earliestMatch = null;
    let matchedPattern = null;

    for (const { regex, type } of patterns) {
      const match = regex.exec(remaining);
      if (match) {
        if (!earliestMatch || match.index < earliestMatch.index) {
          earliestMatch = match;
          matchedPattern = { type, match };
        }
      }
    }

    if (!earliestMatch) {
      result.push(<React.Fragment key={key++}>{remaining}</React.Fragment>);
      break;
    }

    if (earliestMatch.index > 0) {
      result.push(<React.Fragment key={key++}>{remaining.slice(0, earliestMatch.index)}</React.Fragment>);
    }

    const { type, match } = matchedPattern;

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
        result.push(<InlineBlock key={key++} text={match[1]} />);
        break;
      case "image":
        result.push(<ImageBlock key={key++} imgsrc={match[2]} />);
        break;
      case "link":
        result.push(<ExternalLink key={key++} link={match[2]} title={match[1]} />);
        break;
      case "linebreak":
        result.push(<br key={key++} />);
        break;
    }

    remaining = remaining.slice(earliestMatch.index + match[0].length);
  }

  return result;
};
