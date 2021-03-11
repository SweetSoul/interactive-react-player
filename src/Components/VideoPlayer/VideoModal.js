import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalFooter, ModalOverlay } from "@chakra-ui/modal";



export default function VideoModal(){
    const{ isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Título</ModalHeader>
                <ModalBody>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at dui varius, dictum ipsum vitae, suscipit mauris.
                        <br/>Quisque scelerisque est in mauris porta fringilla. Phasellus porta vestibulum ex, vel congue turpis condimentum sit amet.
                    </Text>
                    <Input placeholder='Coloque aqui sua resposta'/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Enviar resposta</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}