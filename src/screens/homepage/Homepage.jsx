import { StyledText, StyledView, StyledTouchableOpacity } from '@common/StyledComponents';
import React, {useState} from 'react';

const Homepage = () => {
  const [count, setCount] = useState(0);

  return (
  
    <>
      <StyledView className="flex-1 justify-center items-center">
     
     <StyledText className="text-3xl">Count {count}</StyledText>
    
     <StyledView className="flex-row gap-4 mt-5">
    
       <StyledTouchableOpacity
         className="w-16 h-16 bg-red-500 rounded-lg justify-center items-center"
         onPress={() => {
           setCount(prevState => prevState - 1);
         }}>
         <StyledText className="text-5xl text-black">-</StyledText>
       </StyledTouchableOpacity>
       
       <StyledTouchableOpacity
         className="w-16 h-16 bg-green-500 rounded-lg justify-center items-center"
         onPress={() => {
           setCount(prevState => prevState + 1);
         }}>
         <StyledText className="text-3xl text-black">+</StyledText>
       </StyledTouchableOpacity>
    
     </StyledView>
   </StyledView>
</>
  );
};

export default Homepage;
