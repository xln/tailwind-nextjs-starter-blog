// components/RedeemResultList.tsx
type RedeemResult = {
  account: string
  cdk: string
  label: string
  statusCode: number
  code?: string
  message?: string
}

export default function RedeemResultList({
  results,
}: {
  results: RedeemResult[]
}) {
  if (!results?.length) {
    return (
      <div className="text-sm text-gray-400 text-center py-6">
        暂无兑换结果
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {results.map((item, index) => {
        const success = item.statusCode === 200
        const tooltipText =
          item.message || (success ? '兑换成功' : '兑换失败')

        return (
          <div
            key={index}
            className="relative group"
          >
            {/* 主卡片 */}
            <div
              className={`rounded-lg border p-4 flex items-start justify-between cursor-pointer
                ${success
                  ? 'border-green-300 bg-green-50'
                  : 'border-red-300 bg-red-50'
                }`}
            >
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">账号：</span>
                  <span>{item.account}</span>
                </div>

                <div className="text-sm">
                  <span className="font-medium text-gray-700">CDK：</span>
                  <span className="font-mono">{item.cdk}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({item.label})
                  </span>
                </div>
              </div>

              <div
                className={`text-sm font-semibold px-3 py-1 rounded-full h-fit
                  ${success
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                  }`}
              >
                {success ? '兑换成功' : '兑换失败'}
              </div>
            </div>

            {/* Tooltip */}
            <div
              className="
                pointer-events-none
                absolute left-1/2 top-full z-10 mt-2 w-max max-w-md
                -translate-x-1/2
                rounded-md bg-black px-3 py-2 text-xs text-white
                opacity-0 transition-opacity duration-200
                group-hover:opacity-100
                break-all
              "
            >
              {tooltipText}
            </div>
          </div>
        )
      })}
    </div>
  )
}
