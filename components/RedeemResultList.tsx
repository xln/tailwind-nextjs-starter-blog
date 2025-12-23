// components/RedeemResultList.tsx
type RedeemResult = {
  account: string
  cdk: string
  label: string
  statusCode: number
  code?: string
  message?: string
}

export default function RedeemResultList({ results }: { results: RedeemResult[] }) {
  if (!results?.length) {
    return <div className="py-6 text-center text-sm text-gray-400">暂无兑换结果</div>
  }

  return (
    <div className="space-y-3">
      {results.map((item, index) => {
        const success = item.statusCode === 200
        const tooltipText = item.message || (success ? '兑换成功' : '兑换失败')

        return (
          <div key={index} className="group relative">
            {/* 主卡片 */}
            <div
              className={`flex cursor-pointer items-start justify-between rounded-lg border p-4 ${
                success ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
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
                  <span className="ml-2 text-xs text-gray-500">({item.label})</span>
                </div>
              </div>

              <div
                className={`h-fit rounded-full px-3 py-1 text-sm font-semibold ${
                  success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {success ? '兑换成功' : '兑换失败'}
              </div>
            </div>

            {/* Tooltip */}
            <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 w-max max-w-md -translate-x-1/2 rounded-md bg-black px-3 py-2 text-xs break-all text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {tooltipText}
            </div>
          </div>
        )
      })}
    </div>
  )
}
