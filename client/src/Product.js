import React, { useEffect, useState } from 'react';
import { Block, ethers } from 'ethers';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function Product() {
    const [product, setproduct] = useState();
    const [products, setproducts] = useState([]);
    const [id, setId] = useState("");
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [quantity, setquantity] = useState("");
    const [uid, setuId] = useState("");
    const [uname, setuname] = useState("");
    const [uprice, setuprice] = useState("");
    const [uquantity, setuquantity] = useState("");

    useEffect(()=>{
      giveproducts();
    },[])

    const saveproduct=()=>{
        console.log(id,name,price,quantity,quantity,typeof quantity);
        
        let prodData={id,name,price,quantity};
        fetch("http://localhost:3500/products",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(prodData)
        }).then((result)=>{
            result.json().then((res)=>{
                console.log(res);
                giveproducts();
            })
        })
       
    }

    const giveproducts = () => {
        fetch("http://localhost:3500/product/").then((result) => {
            return result.json()

        }).then((resp) => {
            console.log(resp)
            console.log("15")
            setproducts(resp)
        })

    }

    const upadateproduct = (id) => {
       
        fetch(`http://localhost:3500/product/${id}` ).then((result) => {
            result.json().then((resp) => {
                // console.log(resp)
                setproduct(resp)
                setuname(resp.name)
                setuprice(resp.price)
                setuquantity(resp.quantity)
                setuId(id)
              
            })
        })


    }
  
    function deleteproduct(id,e){
       // e.preventDefault();
        alert(`deleting the product!!! with ID:${id}`)
        fetch(`http://localhost:3500/products/${id}`,{
            method:'DELETE'
        }).then((result)=>{
            result.json().then((res)=>{
                console.log(res);
                giveproducts();
            })
        })
        
    }
     const updateproduct=()=>{
        let id=uid.toString()
        
        console.log( typeof id,id,uname,uprice,uquantity,typeof uquantity)
        let prodData={uname,uprice,uquantity};
        console.log(prodData)
        fetch(`http://localhost:3500/products/${id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(prodData)
        }).then((result)=>{
            result.json().then((res)=>{
                console.log(res);
                giveproducts();
            })
        })
     }
    


    return (
        <>
        <div>
          <Link to="/token">Go to Token</Link>
        </div>
            <h1>The Product Read AND Wirte on BlockChain</h1>
            <div>
                <input type="text" placeholder="enter id" value={id} onChange={(e)=>{setId(e.target.value)}} /><br></br>
                <input type="text" placeholder="product name" value={name} onChange={(e)=>{setname(e.target.value)}} /><br></br>
                <input type="text" placeholder="Product price" value={price} onChange={(e)=>{setprice(e.target.value)}} /><br></br>
                <input type="text" placeholder="quantity" value={quantity} onChange={(e)=>{setquantity(e.target.value)}} /><br></br>
                <button onClick={saveproduct}>Save product</button>
            </div>

            
            <div className='container'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>price</th>
                            <th>Quantity</th>
                            <th>Delete Product</th>
                            <th>Update Product</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, i) =>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td><button onClick={()=>deleteproduct(item.id)}>Delete</button></td>
                                <td><button onClick={()=>upadateproduct(item.id)}>update product</button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
               <div>
               <input type="text" placeholder="product name" value={uname} onChange={(e)=>{setuname(e.target.value)}} /><br></br>
                <input type="text" placeholder="Product price" value={uprice} onChange={(e)=>{setuprice(e.target.value)}} /><br></br>
                <input type="text" placeholder="quantity" value={uquantity}  onChange={(e)=>{setuquantity(e.target.value)}} /><br></br>
                <button onClick={updateproduct}>Update product</button>
               </div>

            </div>

        </>
    )

}

export default Product;