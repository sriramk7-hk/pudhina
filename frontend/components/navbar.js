import { ConnectButton } from "@rainbow-me/rainbowkit";
function NavBar() {
    return(
        <div className="flex-row ">
            <span>Pudhina</span>
            <ConnectButton label="Connect Wallet" />
        </div>
        
    )
}

export default NavBar;