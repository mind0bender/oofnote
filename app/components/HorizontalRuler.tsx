function HorizontalRuler(): JSX.Element {
  return (
    <div className={`flex justify-center items-center`}>
      <span className={`h-4 border-r-[0.1px] border-stone-700`} />
      <hr className={`w-full border-t border-stone-700`} />
      <span className={`h-4 border-l-[0.1px] border-stone-700`} />
    </div>
  );
}

export default HorizontalRuler;
