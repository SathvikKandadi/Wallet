export default function Balance( { balance }: { balance: number } ) {
  return (
    <div className="flex flex-row gap-4 mx-2 my-4">
        <div className="text-2xl font-bold mx-2">Your Balance</div>
        <div className="text-xl font-semibold my-1">${balance}</div>
      </div>
  )
}
