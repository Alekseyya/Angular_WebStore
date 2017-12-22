import { Injectable } from "@angular/core";



@Injectable()
export class CookieService {



    public DeleteNullProductInCookieListProducts(cookie:string, indexProduct:number, productName:string):string{
        let numberCharProduct = productName.length;
        let leftSeparator = cookie[indexProduct-1];
        let indexLeftSeparartor:number = cookie.indexOf(leftSeparator);
        let leftSubstring:string = cookie.substring(0, indexProduct);
        

        // +2 "," and  count products decimal number "3"
        let indexRightSeparator = indexProduct + numberCharProduct + 2;
        let rightSeparator = cookie[indexRightSeparator];
        let rightSubstring = cookie.substring(indexRightSeparator, cookie.length);
        

        let newCookie:string;
        if(leftSeparator == "[" && rightSeparator == ":"){
          newCookie = leftSubstring + cookie.substring(indexRightSeparator + 1, cookie.length);            
            
        }
        if(leftSeparator == ":" && rightSeparator == ":"){
            newCookie = cookie.substring(0, indexProduct-1) + cookie.substring(indexRightSeparator, cookie.length);
        }
        if(leftSeparator == ":" && rightSeparator == "]"){
            newCookie = cookie.substring(0, indexProduct - 1) + cookie.substring(indexRightSeparator, cookie.length);
        }
        if(leftSeparator == "[" && rightSeparator == "]"){
            newCookie = cookie.substring(0, indexProduct-1);
        }
        return newCookie;
    }

    public AddProductToCookies(cookie:string ,productName: string, productCount: number) {  
        
        // var cookie:string = this.SearchCookieForUserName(this.UserName);
        var newCookieValue:string;        
        if(cookie.indexOf("]")==-1){            
            newCookieValue  = cookie + "[" + productName + "," + productCount + "]";
            console.log(newCookieValue);
            this.SetCookie(newCookieValue, 1);  
        }else{
            var newValueCookie = this.IncrementProductInCookie(cookie, productName, productCount)
             if(newValueCookie == ''){                
                var tmpString =  ":" + productName + "," + productCount + "]";                   
                newCookieValue = cookie.replace("]", tmpString);
                console.log(newCookieValue);
                this.SetCookie(newCookieValue, 1); 
             } else{                
                this.SetCookie(newValueCookie,1);
             }
        }
          
    }

    public DeleteProductInCookie(userName:string, product){
        var productName = product.Name;
        var cookie:string = this.SearchCookieForUserName(userName);
        var newCookie = this.DecrementProductInCookie(cookie, productName);
        if(newCookie == ''){

        }
        this.DecrementProductInCookie(cookie, productName)        
        this.SetCookie(newCookie, 1);         
    }

    public DecrementProductInCookie(cookie:string, productName){
        var indexProduct = cookie.indexOf(productName);
        
         if(indexProduct!=-1){            
             var numberProductInCookie:number = indexProduct + productName.length+1;
             var numberProduct = cookie[numberProductInCookie];
             var newNumberProduct:number = parseInt(numberProduct) - 1;
             let newCookie:string;
             if(newNumberProduct==0){
                newCookie =  this.DeleteNullProductInCookieListProducts(cookie, indexProduct, productName); 
             }else{
                newCookie = cookie.substring(0, numberProductInCookie) + newNumberProduct.toString() + cookie.substring(numberProductInCookie + 1, cookie.length);
             }                    
             
             return newCookie;
             
         }       
         return '';
    }

    public IncrementProductInCookie(cookie:string, productName:string, productCount:number):string{
        var indexProduct = cookie.indexOf(productName);
       
        if(indexProduct!=-1){            
            var numberProductInCookie:number = indexProduct + productName.length+1;
            var numberProduct = cookie[numberProductInCookie];
            var newNumberProduct = productCount + +numberProduct;
                    
            var newCookie = cookie.substring(0, numberProductInCookie) + newNumberProduct.toString() + cookie.substring(numberProductInCookie + 1, cookie.length);
            return newCookie;
            
        }       
        return '';
    }

    public GetAllProductsInCookie(userName: string):any {
        var cookie = this.SearchCookieForUserName(userName);
        var listitemsWithoutComma = cookie.substring(cookie.indexOf("[") + 1, cookie.indexOf("]"));
        if (listitemsWithoutComma) {
            var listItems = listitemsWithoutComma.split(":");            
            return listItems;
        }
        return '';
    }

    public SearchCookieForUserName(userName: string): string {
        var numberChar = userName.length;
        var decodedCookie = decodeURIComponent(document.cookie);

        var arrayCookies = decodedCookie.split(';');
        for (var i = 0; i < arrayCookies.length; i++) {
            var cookie = arrayCookies[i].trim();
            var findedUsername = cookie.substring(0, numberChar);
            if (userName == findedUsername) {
                return cookie;
            }
        }
        return "";
    }


    public SetCookie(value, exdays) {
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = "" + value + ";" + expires + ";path=/";        
    }
}    