import ItemCount from "./ItemCount";
import { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {
  Center,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  CardFooter,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ItemDetail = ({ vanlon2 }) => {
  const { id } = useParams();

  const [producto, setProducto] = useState([]);

  useEffect(() => {
    const db = getFirestore();

    const productos1Ref = doc(db, "Productos1", `${id}`);

    getDoc(productos1Ref).then((snapshot) => {
      if (snapshot.exists()) {
        setProducto(snapshot.data());
      } else {
        console.log("No existe el Producto");
      }
    });
  }, []);

  const vanlonFilter = vanlon2.filter((van) => van.id == id);
  return (
    <>

      {vanlonFilter.map((van) => (
        <div key={van.id}>
          <Center p="1rem">
            <Card boxShadow='2xl' w="350px">
              <CardBody >
                <Box>
                  <Image h='300px' borderRadius="lg" src={van.img} />
                </Box>
                <Stack mt="6" spacing="1.5">
                  <Heading size="md">{van.name}</Heading>
                  <Text fontSize="l">
                    Descripcion: {van.description}
                  </Text>
                  <Text fontSize="l">
                    Categoria: {van.category}
                  </Text>
                  <Text fontSize="l">
                    Stock: {van.stock}
                  </Text>
                  <Heading color="gray.600" fontSize="xl">
                    Precio: ${van.price}
                  </Heading>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ItemCount
                  stock={van.stock}
                  id={van.id}
                  price={van.price}
                  name={van.name}
                  img={van.img}
                  description={van.description}
                />
              </CardFooter>
            </Card>
          </Center>
        </div>
      ))}
    </>
  );
};

export default ItemDetail;
