import '@/styles/globals.css'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { goerli} from 'wagmi';
import Chain  from 'wagmi/chains';
import {alchemyProvider} from 'wagmi/providers/alchemy'
import "@rainbow-me/rainbowkit/styles.css"
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import NavBar from 'components/navbar';

const MantleTestnet =  {
  id: 5001,
  name: "Mantle",
  network: "wadsley",
  iconUrl: "https://ipfs.io/ipfs://QmUsK9fHRDXXpnVdCNya52t55RFPozfWWQVcdDtaFYXbxs",
  iconBackgroung: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "BitDAO",
    symbol: "BIT"
  },
  rpcUrls: {
    default:{
      http: ["https://rpc.testnet.mantle.xyz/"]
    }
  },

  blockExplorers: {
    default:{
      name: "mantle-testnet",
      url:"https://explorer.testnet.mantle.xyz/"
    }
  },

  testnet: true
};

const {chains, provider} = configureChains(
  [goerli,
  MantleTestnet],
  [alchemyProvider({apiKey: process.env.GOERLI_API_KEY}),
  jsonRpcProvider({rpc: chain=>({http: chain.rpcUrls.default.http[0]})})]
)

const {connectors} = getDefaultWallets({
  appName: "Pudhina",
  chains
})

const wagmiClient = createClient({
  connectors,
  provider
})


export default function App({ Component, pageProps }) {
  return(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
