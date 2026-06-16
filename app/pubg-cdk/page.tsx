'use client'

import { useState } from 'react'
import RedeemResultList from '@/components/RedeemResultList'

type Account = {
  nickname: string
  focToken: string
  error?: { nickname?: boolean; focToken?: boolean }
}
type CDK = { label: string; value: string; error?: { label?: boolean; value?: boolean } }

export default function PUBGForm() {
  const [accounts, setAccounts] = useState<Account[]>([{ nickname: '', focToken: '' }])
  const [cdks, setCdks] = useState<CDK[]>([{ label: '', value: '' }])
  const [mode, setMode] = useState<'sequential' | 'concurrent'>('sequential')
  const [concurrentLimit, setConcurrentLimit] = useState(2)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [errorList, setErrorList] = useState<string[]>([])

  const [showAccountJson, setShowAccountJson] = useState(false)
  const [showCdkJson, setShowCdkJson] = useState(false)
  const [accountJsonInput, setAccountJsonInput] = useState('')
  const [cdkJsonInput, setCdkJsonInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setResult(null)
    setErrorList([])

    let hasError = false
    const newAccounts = accounts.map((acc) => {
      const error: any = {}
      if (!acc.nickname?.trim()) {
        error.nickname = true
        hasError = true
      }
      if (!acc.focToken?.trim()) {
        error.focToken = true
        hasError = true
      }
      return { ...acc, error }
    })

    const newCdks = cdks.map((cdk) => {
      const error: any = {}
      if (!cdk.label?.trim()) {
        error.label = true
        hasError = true
      }
      if (!cdk.value?.trim()) {
        error.value = true
        hasError = true
      }
      return { ...cdk, error }
    })

    setAccounts(newAccounts)
    setCdks(newCdks)

    if (hasError) {
      const errors: string[] = []

      newAccounts.forEach((acc, i) => {
        if (acc.error?.nickname) errors.push(`账号列表的第 ${i + 1} 行：请填写昵称`)
        if (acc.error?.focToken)
          errors.push(`账号列表的第 ${i + 1} 行：${acc.nickname || '昵称未填'} 的 FOC Token 未填写`)
      })

      newCdks.forEach((cdk, i) => {
        if (cdk.error?.label) errors.push(`CDK列表的第 ${i + 1} 行：请填写 CDK 名称`)
        if (cdk.error?.value)
          errors.push(`CDK列表的第 ${i + 1} 行：${cdk.label || 'CDK名称未填'} 的 CDK 值未填写`)
      })

      setErrorList(errors)
      return
    }

    setLoading(true)
    const payload: any = { accounts, cdks, mode }
    if (mode === 'concurrent') {
      payload.concurrentLimit = concurrentLimit
    }

    try {
      const res = await fetch(
        `http://${process.env.NODE_ENV === 'development' ? '0.0.0.0' : '183.87.134.0'}:5678/webhook/redeem-pubg`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ error: (err as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const handleImportJson = (type: 'accounts' | 'cdks') => {
    try {
      const parsed = JSON.parse(type === 'accounts' ? accountJsonInput : cdkJsonInput)
      if (!Array.isArray(parsed)) throw new Error('必须是数组')
      if (type === 'accounts') {
        setAccounts(parsed)
        setAccountJsonInput('')
        setShowAccountJson(false)
      } else {
        setCdks(parsed)
        setCdkJsonInput('')
        setShowCdkJson(false)
      }
    } catch (err) {
      alert('解析失败: ' + (err as Error).message)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">PUBG CDK 批量兑换</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block font-medium">模式</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="w-full rounded border p-2"
          >
            <option value="sequential">顺序兑换</option>
            {/* <option value="concurrent">并发兑换</option> */}
          </select>
        </div>

        {mode === 'concurrent' && (
          <div>
            <label className="mb-1 block font-medium">并发限制</label>
            <input
              type="number"
              value={concurrentLimit}
              onChange={(e) => setConcurrentLimit(Number(e.target.value))}
              className="w-full rounded border p-2"
              min={1}
            />
          </div>
        )}

        {/* 账号列表 */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block font-medium">账号列表</label>
            {!showAccountJson && (
              <button
                type="button"
                className="text-sm text-blue-500 underline"
                onClick={() => setShowAccountJson(!showAccountJson)}
              >
                导入账号JSON
              </button>
            )}
            {showAccountJson && (
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-300 px-3 py-1"
                  onClick={() => setShowAccountJson(false)}
                >
                  关闭
                </button>
                <button
                  type="button"
                  className="rounded bg-green-500 px-3 py-1 text-white"
                  onClick={() => handleImportJson('accounts')}
                >
                  导入
                </button>
              </div>
            )}
          </div>

          {showAccountJson && (
            <div className="mb-2">
              <textarea
                className="h-32 w-full rounded border p-2"
                value={accountJsonInput}
                onChange={(e) => setAccountJsonInput(e.target.value)}
                placeholder='粘贴 JSON 数组，如 [{"nickname":"xxx","focToken":"xxx"}]'
              />
            </div>
          )}

          {accounts.map((acc, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input
                type="text"
                placeholder="昵称"
                value={acc.nickname}
                onChange={(e) => {
                  const newAccounts = [...accounts]
                  newAccounts[i].nickname = e.target.value
                  setAccounts(newAccounts)
                }}
                className={`flex-1 rounded border p-2 ${
                  acc.error?.nickname ? 'border-red-500' : ''
                }`}
              />
              <input
                type="text"
                placeholder="FOC Token"
                value={acc.focToken}
                onChange={(e) => {
                  const newAccounts = [...accounts]
                  newAccounts[i].focToken = e.target.value
                  setAccounts(newAccounts)
                }}
                className={`flex-2 rounded border p-2 ${
                  acc.error?.focToken ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setAccounts(accounts.filter((_, idx) => idx !== i))}
                className="rounded bg-red-500 px-2 text-white"
              >
                删除
              </button>
            </div>
          ))}
          {!showAccountJson && (
            <button
              type="button"
              onClick={() => setAccounts([...accounts, { nickname: '', focToken: '' }])}
              className="rounded bg-green-500 px-3 py-1 text-white"
            >
              添加账号
            </button>
          )}
        </div>

        {/* CDK 列表 */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block font-medium">CDK 列表</label>
            {!showCdkJson && (
              <button
                type="button"
                className="text-sm text-blue-500 underline"
                onClick={() => setShowCdkJson(!showCdkJson)}
              >
                导入CDK JSON
              </button>
            )}
            {showCdkJson && (
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-300 px-3 py-1"
                  onClick={() => setShowCdkJson(false)}
                >
                  关闭
                </button>
                <button
                  type="button"
                  className="rounded bg-green-500 px-3 py-1 text-white"
                  onClick={() => handleImportJson('cdks')}
                >
                  导入
                </button>
              </div>
            )}
          </div>

          {showCdkJson && (
            <div className="mb-2">
              <textarea
                className="h-32 w-full rounded border p-2"
                value={cdkJsonInput}
                onChange={(e) => setCdkJsonInput(e.target.value)}
                placeholder='粘贴 JSON 数组，如 [{"label":"xxx","value":"xxx"}]'
              />
            </div>
          )}

          {cdks.map((cdk, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input
                type="text"
                placeholder="标签"
                value={cdk.label}
                onChange={(e) => {
                  const newCdks = [...cdks]
                  newCdks[i].label = e.target.value
                  setCdks(newCdks)
                }}
                className={`flex-1 rounded border p-2 ${cdk.error?.label ? 'border-red-500' : ''}`}
              />
              <input
                type="text"
                placeholder="CDK"
                value={cdk.value}
                onChange={(e) => {
                  const newCdks = [...cdks]
                  newCdks[i].value = e.target.value
                  setCdks(newCdks)
                }}
                className={`flex-2 rounded border p-2 ${cdk.error?.value ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setCdks(cdks.filter((_, idx) => idx !== i))}
                className="rounded bg-red-500 px-2 text-white"
              >
                删除
              </button>
            </div>
          ))}
          {!showCdkJson && (
            <button
              type="button"
              onClick={() => setCdks([...cdks, { label: '', value: '' }])}
              className="rounded bg-green-500 px-3 py-1 text-white"
            >
              添加 CDK
            </button>
          )}
        </div>

        {errorList.length > 0 && (
          <div className="rounded border border-red-400 bg-red-100 p-2 text-red-700">
            {errorList.map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={loading}
        >
          {loading ? '兑换中...' : '提交'}
        </button>
      </form>

      {result && <RedeemResultList results={result} />}
      {/* {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50 overflow-auto max-h-96">
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )} */}
    </div>
  )
}
