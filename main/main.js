module.exports = function main() {
    // console.log("Debug Info");
    // return 'Hello World!';

    function printReceipt(inputs) {
        function Receipt(barcode, name, unit, price) {
            this.Barcode = barcode;
            this.Name = name;
            this.Unit = unit;
            this.Price = price;
            this.Quantity = 1;
        }

        Receipt.prototype = {
            constructor: Receipt,
            Output: function () {
                let multiple = "";
                if (this.Quantity > 1) {
                    multiple = " " + this.Unit + "s";
                }
                let outString = "Name: " + this.Name + ", Quantity: " + this.Quantity + multiple + ", Unit price: " + this.Price.toFixed(2) + " (yuan), Subtotal: " + (this.Price * this.Quantity).toFixed(2) + " (yuan)";
                console.log(outString);
            }
        }

        let map = new Map();

        for (let i = 0; i < inputs.length; i++) {
            let receipt = new Receipt(inputs[i].Barcode, inputs[i].Name, inputs[i].Unit, inputs[i].Price);
            if (map.has(receipt.Barcode)) {
                map.get(receipt.Barcode).Quantity += 1;
            }
            else {
                map.set(receipt.Barcode, receipt);
            }
        }

        console.log('***<store earning no money>Receipt ***');

        let total = 0;
        let arr = Array.from(map);
        arr.sort((a, b) => a.Quantity - b.Quantity);
        for (let i = 0; i < arr.length; i++) {
            arr[i][1].Output();
            total += arr[i][1].Price * arr[i][1].Quantity;
        }

        console.log('----------------------');
        console.log('Total: ' + total.toFixed(2) + ' (yuan)');
        console.log('**********************');
    }

    let inputs = new Array(
        {
            Barcode: 'ITEM000000',
            Name: 'Coca-Cola',
            Unit: 'bottle',
            Price: 3.00

        },
        {
            Barcode: 'ITEM000000',
            Name: 'Coca-Cola',
            Unit: 'bottle',
            Price: 3.00
        },
        {
            Barcode: 'ITEM000000',
            Name: 'Coca-Cola',
            Unit: 'bottle',
            Price: 3.00
        },
        {
            Barcode: 'ITEM000000',
            Name: 'Coca-Cola',
            Unit: 'bottle',
            Price: 3.00
        },
        {
            Barcode: 'ITEM000000',
            Name: 'Coca-Cola',
            Unit: 'bottle',
            Price: 3.00
        },
        {
            Barcode: 'ITEM000001',
            Name: 'Sprite',
            Unit: 'bottle',
            Price: 3.00
        },
        {
            Barcode: 'ITEM000001',
            Name: 'Sprite',
            Unit: 'bottle',
            Price: 3.00
        },
        {
            Barcode: 'ITEM000004',
            Name: 'Battery',
            Unit: 'a',
            Price: 2.00
        }
    );

    printReceipt(inputs);
};

