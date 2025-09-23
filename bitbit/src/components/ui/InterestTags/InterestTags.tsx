import { type FC } from "react";
import {
  INTEREST_OPTIONS,
  type InterestOption,
} from "@/features/auth/types/auth.types";

interface InterestTagsProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
  className?: string;
}

const InterestTags: FC<InterestTagsProps> = ({
  selectedInterests,
  onChange,
  className = "",
}) => {
  const handleTagClick = (interestId: string) => {
    const isSelected = selectedInterests.includes(interestId);

    if (isSelected) {
      // 取消选择
      onChange(selectedInterests.filter((id) => id !== interestId));
    } else {
      // 添加选择
      onChange([...selectedInterests, interestId]);
    }
  };

  const getTagClasses = (option: InterestOption, isSelected: boolean) => {
    const baseClasses =
      "inline-flex items-center justify-center px-4 h-9 rounded-[18px] text-sm font-medium cursor-pointer transition-all duration-200 border-[1.5px]";

    if (isSelected) {
      if (option.id === "sports") {
        return `${baseClasses} bg-[#4E6FFF] text-white border-[#4E6FFF]`;
      } else {
        return `${baseClasses} border-current`;
      }
    } else {
      return `${baseClasses} bg-white border-[#E0E0E6] text-[#666666] hover:border-[#CCCCCC]`;
    }
  };

  const getTagStyle = (option: InterestOption, isSelected: boolean) => {
    if (isSelected && option.id !== "sports") {
      return {
        backgroundColor: option.bgColor,
        color: option.color,
        borderColor: option.color,
      };
    }
    return {};
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <p className="text-base font-medium text-[#222222]">
        感兴趣的活动类型{" "}
        <span className="text-sm text-[#999999] font-normal">(可选)</span>
      </p>

      <div className="flex flex-wrap gap-3">
        {INTEREST_OPTIONS.map((option) => {
          const isSelected = selectedInterests.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              className={getTagClasses(option, isSelected)}
              style={getTagStyle(option, isSelected)}
              onClick={() => handleTagClick(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InterestTags;
