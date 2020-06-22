const LoanContract = artifacts.require('./../contracts/LoanContract.sol');

contract('LoanContract', function (accounts) {
    it('initiates contract', async function () {
        // const contract = await LoanContract.deployed();  old
        const contract = await LoanContract.new();
        // console.log("hello")
        // console.log("getting lenders", contract.getNumLenders())
        assert.equal(await contract.getNumLenders(), 0, "Num Lenders Not initialized to zero value");
        assert.equal(1, 1, "Test test")
        // const approver = await contract.approver.call();	//allows access into the contract file
        // assert.equal(approver, "0xe9bB6A5E4Fe9263a5c877D9Ce9c869460ad41D41", "Approvers don't match")
    });

    it('takes a depost', async function () {
        const contract = await LoanContract.deployed();
        await contract.addLender({ 'value': 1e+18 });
        //await contract.AddLender(accounts[0], { value: 1e+18, from: accounts[1] });
        const contract_bal = await contract.getContractBalance();
        const balance = await web3.eth.getBalance(contract.address);
        assert.equal(balance.toString(), contract_bal, "issue with getContractBalance()");
        // assert.equal(balance.toString(), web3.utils.toBN(1e+18).toString(), "amount did not match");
        // assert.equal(web3.eth.getBalance(contract.address), 1e+18, "amounts didn't match");
    });
    it('Calculates NumLenders correctly', async function () {
        const contract2 = await LoanContract.deployed();
        await contract2.addLender({ 'value': 1e+18 });
        await contract2.addLender({ 'value': 1e+18 });
        await contract2.addLender({ 'value': 1e+18 });
        await contract2.addLender({ 'value': 1e+18 });
        await contract2.addLender({ 'value': 1e+18 });
        //await contract.AddLender(accounts[0], { value: 1e+18, from: accounts[1] });
        const numLenders = await contract.getNumLenders();
        assert.equal(numLenders, 5, "issue with Adding Lenders or NumLenders");
        // assert.equal(balance.toString(), web3.utils.toBN(1e+18).toString(), "amount did not match");
        // assert.equal(web3.eth.getBalance(contract.address), 1e+18, "amounts didn't match");
    });
});