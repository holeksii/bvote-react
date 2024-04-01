interface SlotComponentProps {
  name: string;
  progress: number;
  className?: string;
  onClick?: () => void;
}

const SlotComponent = ({
  name,
  progress,
  className = "",
  onClick,
}: SlotComponentProps) => {
  return (
    <div className={"rounded-xl px-1 py-2 " + className} onClick={onClick}>
      <div className="flex justify-between">
        <div className="w-26">{name}</div>

        <div>{progress}%</div>
      </div>
      <div className="flex h-3 w-full flex-row overflow-hidden rounded-3xl">
        <div
          className="flex-shrink-0 bg-blue-500"
          style={{
            width: `${progress}%`,
          }}
        ></div>
        <div className="w-full flex-shrink-0 bg-slate-700"></div>
      </div>
    </div>
  );
};

export default SlotComponent;
