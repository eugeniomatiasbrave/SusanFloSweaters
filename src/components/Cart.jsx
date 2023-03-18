import { CartContext } from "../context/CartContextComp";
import { useContext, useState } from "react";
import {Button,Image,Table,Thead,Tr,Tbody,Td,Th,Center} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const [cart, setCart, borrarCarrito, borrarUno, sumaTotal] = useContext(CartContext);

  const unidadTotal = () => {
    return cart.reduce((total, vln) => (total += vln.cantidad), 0);
  };

  if (sumaTotal() === 0) {
    Swal.fire({
      icon: "error",
      title: "El carrito se encuentra vacio",
      backdrop: true,
      confirmButtonText: '<a href="/catalogo">Volver</a>',
      confirmButtonColor: "rgb(197, 48, 48)",
    });
  }

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Imagen</Th>
            <Th>Producto</Th>
            <Th>Precio x Uds</Th>
            <Th>Unidades</Th>
            <Th>Total x Uds</Th>
            <Th>Accion</Th>
          </Tr>
        </Thead>
        <Tbody maxW="800 px">
          {cart.map((vln) => {
            return (
              <Tr key={vln.id}>
                <Td>
                  <Image boxSize="100px" src={vln.img} />
                </Td>
                <Td>{vln.name}</Td>
                <Td> ${vln.price}</Td>
                <Td>{vln.cantidad}</Td>
                <Td color="gray.600" fontSize="xxl">
                  {" "}
                  ${vln.cantidad * vln.price}
                </Td>
                <Td>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    size="sm"
                    onClick={() => borrarUno(vln.id)}
                  >
                    {" "}
                    Eliminar{" "}
                  </Button>
                </Td>
              </Tr>
            );
          })}
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Th color="gray.800" fontSize="sm">Total Uds: {unidadTotal()}</Th>
            <Th color="gray.800" fontSize="sm">Suma Total: ${sumaTotal()}</Th>
            <Td></Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td>
              {" "}
              <Link to={"/catalogo"}>
                <Button
                  variant="solid"
                  colorScheme="red"
                  size="sm"
                  onClick={borrarCarrito}
                >
                  Vaciar Carrito
                </Button>
              </Link>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      
      <Center>
        <Checkout/>
      </Center>
    </>
  );
};

export default Cart;
