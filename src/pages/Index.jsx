import { useState } from 'react';
import { Box, Button, Flex, Input, List, ListItem, Text, useColorModeValue, VStack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTask = () => {
    if (input.trim() !== '') {
      if (editingTask) {
        setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, text: input } : task));
        setEditingTask(null);
      } else {
        const newTask = { id: Date.now(), text: input, isCompleted: false };
        setTasks([...tasks, newTask]);
      }
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setInput(task.text);
    onOpen();
  };

  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box p={8} bg={bg} minH="100vh">
      <Flex as="nav" justify="space-between" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2} colorScheme="blue">
            <FaPlus />
          </Button>
        </Flex>
        <List w="full">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg="white" boxShadow="sm" borderRadius="md">
              <Text as={task.isCompleted ? 's' : undefined}>{task.text}</Text>
              <Flex>
                <IconButton icon={<FaEdit />} onClick={() => handleEditTask(task)} colorScheme="purple" mr={2} />
                <Button onClick={() => handleToggleComplete(task.id)} colorScheme={task.isCompleted ? "green" : "gray"} mr={2}>
                  <FaCheckCircle />
                </Button>
                <Button onClick={() => handleDeleteTask(task.id)} colorScheme="red">
                  <FaTrash />
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Edit task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddTask}>
              Update Task
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;