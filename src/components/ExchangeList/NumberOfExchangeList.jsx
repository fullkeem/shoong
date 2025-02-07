export default function NumberOfExchangeList({ exchangeListData }) {
  return (
    <div className="mx-auto mt-2 w-full self-start border-t border-primary p-2 desktop:my-2 desktop:w-full">
      <span className="text-b04 font-b04 leading-7 text-gray500">
        {exchangeListData ? exchangeListData.length : 0}
      </span>
      <span className="pl-1 text-b04 font-b04 leading-7 text-gray400">
        개의 교환 글
      </span>
    </div>
  );
}
