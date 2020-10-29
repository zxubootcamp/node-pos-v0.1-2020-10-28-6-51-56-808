module.exports = function main(inputs) {
    function Receipt(barcode, name, unit, price) {
        this.Barcode = barcode;
        this.Name = name;
        this.Unit = unit;
        this.Price = price;
        this.Quantity = 1;
    }

    Receipt.prototype = {
        constructor: Receipt,
        ToOutput: function () {
            let unitString = "";
            if (this.Quantity > 1) {
                unitString = " " + this.Unit + "s";
            }
            let outString = "Name: " + this.Name + ", Quantity: " + this.Quantity + unitString + ", Unit price: " + this.Price.toFixed(2) + " (yuan), Subtotal: " + (this.Price * this.Quantity).toFixed(2) + " (yuan)\n";
            return outString;
        }
    }

    function printReceipt(inputs) {
        let receiptMap = new Map();

        for (let i = 0; i < inputs.length; i++) {
            let receipt = new Receipt(inputs[i].Barcode, inputs[i].Name, inputs[i].Unit, inputs[i].Price);
            if (receiptMap.has(receipt.Barcode)) {
                receiptMap.get(receipt.Barcode).Quantity += 1;
            }
            else {
                receiptMap.set(receipt.Barcode, receipt);
            }
        }
        let outputString = '***<store earning no money>Receipt ***\n';
        let totalPrice = 0;
        let receiptArray = Array.from(receiptMap);
        receiptArray.sort((a, b) => a.Quantity - b.Quantity);
        for (let i = 0; i < receiptArray.length; i++) {
            outputString += receiptArray[i][1].ToOutput();
            totalPrice += receiptArray[i][1].Price * receiptArray[i][1].Quantity;
        }
        outputString += '----------------------\n';
        outputString += 'Total: ' + totalPrice.toFixed(2) + ' (yuan)\n';
        outputString += '**********************\n';
        return outputString;
    }

    return printReceipt(inputs);
}