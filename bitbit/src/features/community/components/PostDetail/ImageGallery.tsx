import { type FC } from "react";
import { Modal } from "@/components/ui";

interface ImageGalleryProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      size="full"
      className="bg-black bg-opacity-90"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors"
        >
          <svg
            className="w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 图片计数 */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white bg-opacity-20 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* 主图片 */}
        <div className="relative max-w-4xl max-h-full mx-auto">
          <img
            src={images[currentIndex]}
            alt={`图片 ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* 导航按钮 */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* 缩略图导航 */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full p-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    /* 可以添加切换到指定图片的功能 */
                  }}
                  className={`
                    w-2 h-2 rounded-full transition-colors
                    ${
                      index === currentIndex
                        ? "bg-white"
                        : "bg-white bg-opacity-50"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageGallery;
