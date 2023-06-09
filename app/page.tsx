// export default function Home (){
//   return (
//     <h1>hello</h1>
//   )
// }
"use client"
import { useState } from 'react'
import { getDefaultProvider } from 'ethers'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


//------- ranbow imports
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon,polygonMumbai, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';import { darkTheme } from '@rainbow-me/rainbowkit';

import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodevapp/wagmi/rainbowkit'

import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image'
//-----
export default function Home() {
  return (
    <div>
      {RainbowKitExample()}
    </div>
  );
}


const defaultProjectId = "ee5c9acd-6e95-4cf2-9c31-cd62186b5b97";

function RainbowKitExample() {
  const connectors = connectorsForWallets([
    {
      groupName: 'Social',
      wallets: [
        googleWallet({options: { projectId: defaultProjectId }}),
        facebookWallet({options: { projectId: defaultProjectId }}),
        githubWallet({options: { projectId: defaultProjectId }}),
        discordWallet({options: { projectId: defaultProjectId }}),
        twitchWallet({options: { projectId: defaultProjectId }}),
        twitterWallet({options: { projectId: defaultProjectId }})
      ],
    },
  ]);

  const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [publicProvider()],
  )
  const client = createClient({
    autoConnect: false,
    connectors,
    provider,
    webSocketProvider,
  })

  return (
    <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains} modalSize={'compact'} >
            <div className='flex justify-between items-center p-4 bg-white w-full h-16'>
              <Image
              src='/logo.png'
              alt='logo'
              width={100}
              height={80}
              className='p-8'/>
            <ConnectButton /></div>
            <div className='flex justify-center items-center text-lg text-black'>
              Welcome Visitors,<br/>
              Connect your wallet with Social Apps
            </div>
        </RainbowKitProvider>
    </WagmiConfig>
  )
}

