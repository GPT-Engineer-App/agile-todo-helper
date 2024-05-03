import { useState } from 'react';
import { Box, Button, Flex, Input, List, ListItem, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
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
    </Box>
  );
};

export default Index;