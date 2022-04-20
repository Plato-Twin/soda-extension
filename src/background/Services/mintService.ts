import web3 from 'web3';
import { createWeb3, requestAccounts } from './metamask';
import Contracts from '../configs/contracts';
import RpcRouterAbi from '../configs/abis/RPCRouter.json';
import Meme2Abi from '../configs/abis/PlatwinMEME2.json';
import ERC20abi from '../configs/ERC20abi.json';
import MarketAbi from '../configs/abis/Market.json';
import { getOrderByTokenId } from '../../utils/apis';
import { AbiItem } from 'web3-utils';
const maxUint256 = web3.utils
  .toBN(2)
  .pow(web3.utils.toBN(256))
  .sub(web3.utils.toBN(1));
const CHAIN_ID = 80001;

export const mintToken = async (hash: string) => {
  const web3 = createWeb3();
  const { accounts } = await requestAccounts();
  const account = accounts[0];
  const cashContract = new web3.eth.Contract(
    ERC20abi.abi as AbiItem[],
    Contracts.MockRPC[CHAIN_ID],
  );
  const meme2Contract = new web3.eth.Contract(
    Meme2Abi.abi as AbiItem[],
    Contracts.PlatwinMEME2WithoutRPC[CHAIN_ID],
  );
  const rpcRouter = new web3.eth.Contract(
    RpcRouterAbi.abi as AbiItem[],
    Contracts.RPCRouter[CHAIN_ID],
  );
  /* Mint MEME2 */
  let mintFee = await rpcRouter.methods
    .fixedAmountFee(Contracts.PlatwinMEME2WithoutRPC[CHAIN_ID])
    .call();
  console.log(mintFee);
  const fee = mintFee[0] || 0;
  // gas > 0
  if (web3.utils.toBN(fee).gt(web3.utils.toBN(0))) {
    let allowance = await cashContract.methods
      .allowance(account, Contracts.RPCRouter[CHAIN_ID])
      .call();
    if (allowance.lt(mintFee)) {
      await cashContract.methods.approve(
        Contracts.RPCRouter[CHAIN_ID],
        maxUint256,
      );
    }
  }
  console.log('account ', account);
  // mint
  let tokenId;
  return new Promise((resolve, reject) => {
    meme2Contract.methods
      .mint(account, hash)
      .send({ from: account })
      .on('receipt', function (receipt: any) {
        let transferEvt = receipt.events.Transfer;
        if (
          transferEvt.address === Contracts.PlatwinMEME2WithoutRPC[CHAIN_ID]
        ) {
          tokenId = transferEvt.returnValues.tokenId;
          console.log('++++++++++++++++++++', tokenId);
          resolve(tokenId);
        }
      })
      .on('error', function (error: Error) {
        console.log('MintService error:', error);
        reject(error);
      });
  });
};

export const getOwner = async (tokenId: string) => {
  try {
    const web3 = createWeb3();

    const meme2Contract = new web3.eth.Contract(
      Meme2Abi.abi as AbiItem[],
      Contracts.PlatwinMEME2WithoutRPC[CHAIN_ID],
    );
    let owner = await meme2Contract.methods.ownerOf(tokenId).call();
    console.log('owner: ', owner);
    // on market
    if (owner === Contracts.MarketProxyWithoutRPC[CHAIN_ID]) {
      //TODO get order with tokenId, the seller is the owner
      const order = await getOrderByTokenId(tokenId);
      console.log('order: ', order);
      owner = order.seller;
    }
    return owner;
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const getMinter = async (tokenId: string) => {
  try {
    const web3 = createWeb3();

    const meme2Contract = new web3.eth.Contract(
      Meme2Abi.abi as AbiItem[],
      Contracts.PlatwinMEME2WithoutRPC[CHAIN_ID],
    );
    const minter = await meme2Contract.methods.minter(tokenId).call();
    return minter;
  } catch (err) {
    console.log(err);
    return '';
  }
};