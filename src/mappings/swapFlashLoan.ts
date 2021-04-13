import {
  AddLiquidity,
  FlashLoan,
  NewAdminFee,
  NewSwapFee,
  NewWithdrawFee,
  RampA,
  RemoveLiquidity,
  RemoveLiquidityImbalance,
  RemoveLiquidityOne,
  StopRampA,
  TokenSwap,
} from "../../generated/USDPool/SwapFlashLoan"
import {
  AddLiquidityEvent,
  FlashLoanEvent,
  NewAdminFeeEvent,
  NewSwapFeeEvent,
  NewWithdrawFeeEvent,
  RampAEvent,
  RemoveLiquidityEvent,
  StopRampAEvent,
  TokenExchange,
} from "../../generated/schema"
import { getBalances, getOrCreateSwap } from "../entities/swap"

import { BigInt } from "@graphprotocol/graph-ts"
import { getSystemInfo } from "../entities/system"

export function handleNewAdminFee(event: NewAdminFee): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.adminFee = event.params.newAdminFee
  swap.save()

  let log = new NewAdminFeeEvent(
    "new_admin_fee-" + event.transaction.hash.toHexString(),
  )

  log.swap = swap.id
  log.newFee = event.params.newAdminFee

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleNewSwapFee(event: NewSwapFee): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.swapFee = event.params.newSwapFee
  swap.save()

  let log = new NewSwapFeeEvent(
    "new_swap_fee-" + event.transaction.hash.toHexString(),
  )

  log.swap = swap.id
  log.newFee = event.params.newSwapFee

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleNewWithdrawFee(event: NewWithdrawFee): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.withdrawFee = event.params.newWithdrawFee
  swap.save()

  let log = new NewWithdrawFeeEvent(
    "new_withdraw_fee-" + event.transaction.hash.toHexString(),
  )

  log.swap = swap.id
  log.newFee = event.params.newWithdrawFee

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleRampA(event: RampA): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)

  let log = new RampAEvent("ramp_A-" + event.transaction.hash.toHexString())

  log.swap = swap.id
  log.oldA = event.params.oldA
  log.newA = event.params.newA
  log.initialTime = event.params.initialTime
  log.futureTime = event.params.futureTime

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleStopRampA(event: StopRampA): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.A = event.params.currentA
  swap.save()

  let log = new StopRampAEvent(
    "stop_ramp_A-" + event.transaction.hash.toHexString(),
  )

  log.swap = swap.id
  log.currentA = event.params.currentA
  log.time = event.params.time

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleAddLiquidity(event: AddLiquidity): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.balances = getBalances(event.address, swap.numTokens)
  swap.save()

  let log = new AddLiquidityEvent(
    "add_liquidity-" + event.transaction.hash.toHexString(),
  )

  log.swap = swap.id
  log.provider = event.params.provider
  log.tokenAmounts = event.params.tokenAmounts
  log.fees = event.params.fees
  log.invariant = event.params.invariant
  log.lpTokenSupply = event.params.lpTokenSupply

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.balances = getBalances(event.address, swap.numTokens)
  swap.save()

  let log = new RemoveLiquidityEvent(
    "remove_liquidity-" + event.transaction.hash.toHexString(),
  )

  log.swap = swap.id
  log.provider = event.params.provider
  log.tokenAmounts = event.params.tokenAmounts
  log.lpTokenSupply = event.params.lpTokenSupply

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleRemoveLiquidityOne(event: RemoveLiquidityOne): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.balances = getBalances(event.address, swap.numTokens)
  swap.save()

  let log = new RemoveLiquidityEvent(
    "remove_liquidity_one-" + event.transaction.hash.toHexString(),
  )

  let tokenAmounts: BigInt[] = []
  for (let i = 0; i < swap.numTokens; i++) {
    if (i === parseInt(event.params.boughtId.toString())) {
      tokenAmounts.push(event.params.tokensBought)
    } else {
      tokenAmounts.push(BigInt.fromI32(0))
    }
  }

  log.swap = swap.id
  log.provider = event.params.provider
  log.tokenAmounts = tokenAmounts
  log.lpTokenSupply = event.params.lpTokenSupply

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleRemoveLiquidityImbalance(
  event: RemoveLiquidityImbalance,
): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.balances = getBalances(event.address, swap.numTokens)
  swap.save()

  let log = new RemoveLiquidityEvent(
    "remove_liquidity_imbalance-" + event.transaction.hash.toHexString(),
  )

  log.swap = swap.id
  log.provider = event.params.provider
  log.tokenAmounts = event.params.tokenAmounts
  log.fees = event.params.fees
  log.invariant = event.params.invariant
  log.lpTokenSupply = event.params.lpTokenSupply

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleFlashLoan(event: FlashLoan): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.balances = getBalances(event.address, swap.numTokens)
  swap.save()

  let log = new FlashLoanEvent(
    "flash_loan-" + event.transaction.hash.toHexString(),
  )

  log.swap = swap.id
  log.receiver = event.params.receiver
  log.tokenIndex = event.params.tokenIndex
  log.amount = event.params.amount
  log.amountFee = event.params.amountFee
  log.protocolFee = event.params.protocolFee

  log.block = event.block.number
  log.timestamp = event.block.timestamp
  log.transaction = event.transaction.hash

  log.save()
}

export function handleTokenSwap(event: TokenSwap): void {
  let swap = getOrCreateSwap(event.address, event.block, event.transaction)
  swap.balances = getBalances(event.address, swap.numTokens)
  swap.save()

  if (swap != null) {
    let exchange = new TokenExchange(
      "token_exchange-" + event.transaction.hash.toHexString(),
    )

    exchange.swap = swap.id
    exchange.buyer = event.params.buyer
    exchange.soldId = event.params.soldId
    exchange.tokensSold = event.params.tokensSold
    exchange.boughtId = event.params.boughtId
    exchange.tokensBought = event.params.tokensBought

    exchange.block = event.block.number
    exchange.timestamp = event.block.timestamp
    exchange.transaction = event.transaction.hash

    exchange.save()

    let system = getSystemInfo(event.block, event.transaction)
    system.exchangeCount = system.exchangeCount.plus(BigInt.fromI32(1))
    system.save()
  }
}
