const { ethers } = require('ethers');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    const rpcUrl = await prompt("Type your RPC URL: ");

    const provider = new ethers.JsonRpcProvider(rpcUrl);

    handleMenu(provider);
}

async function handleMenu(provider) {
    const address = await prompt("Type your wallet address: ");
    if (!ethers.isAddress(address)) {
        console.log("Wrong Ethereum address. Try again.\n");
    } else {
        const balance = await provider.getBalance(address);
        console.log(`Balance: ${ethers.formatEther(balance)} ETH\n`);
    }
    handleMenu(provider);
}

function prompt(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

main().catch(err => {
    console.error("Error:", err);
    rl.close();
});
