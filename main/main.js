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
            let outString = `Name: ${this.Name}, Quantity: ${this.Quantity + unitString}, Unit price: ${this.Price.toFixed(2)} (yuan), Subtotal: ${(this.Price * this.Quantity).toFixed(2)} (yuan)\n`
            return outString;
        }
    }

    function printReceipt(inputs) {
        let receiptMap = new Map();
        inputs.map(item => receiptMap.has(item.Barcode) ? receiptMap.get(item.Barcode).Quantity += 1 : receiptMap.set(item.Barcode, new Receipt(item.Barcode, item.Name, item.Unit, item.Price)));

        let receiptArray = Array.from(receiptMap).sort((a, b) => a.Quantity - b.Quantity);

        return `***<store earning no money>Receipt ***\n` +
            `${receiptArray.map(item => item = item[1].ToOutput()).reduce((x, y) => x + y)}` +
            `----------------------\n` +
            `Total: ${receiptArray.map(item => item[1].Price * item[1].Quantity).reduce((x, y) => x + y).toFixed(2)} (yuan)\n` +
            `**********************\n`;
    }

    return printReceipt(inputs);
}
