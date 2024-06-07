import { TagType } from "../../common/v3/Tag/types";
import { Tooltip } from "../../common/v3/Tooltip";
import * as s from "./styles";
import { ScoreProps } from "./types";

export const HIGH_SEVERITY_SCORE_THRESHOLD = 80;

export const getTagType = (score: number): TagType => {
  if (score <= 40) {
    return "lowSeverity";
  }

  if (score <= HIGH_SEVERITY_SCORE_THRESHOLD) {
    return "mediumSeverity";
  }

  return "highSeverity";
};

const renderScoreTagTitle = (scoreParams: Record<string, string> | null) => {
  if (!scoreParams || Object.keys(scoreParams).length === 0) {
    return null;
  }

  const params = Object.entries(scoreParams).map(([key, value]) => (
    <div key={key}>
      {key}: {value}
    </div>
  ));

  return <s.ScoreTagTitleContainer>{params}</s.ScoreTagTitleContainer>;
};

export const Score = ({ data }: ScoreProps) => {
  const tagType = getTagType(data.score);

  const isScoreTagTitleDisabled =
    !data.scoreParams || Object.keys(data.scoreParams).length === 0;

  return (
    <Tooltip
      title={renderScoreTagTitle(data.scoreParams)}
      isDisabled={isScoreTagTitleDisabled}
    >
      <s.ScoreTag type={tagType} content={data.score} />
    </Tooltip>
  );
};
