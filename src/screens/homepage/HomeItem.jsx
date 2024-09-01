import React from 'react';
import { StyledText, StyledView } from '@common/StyledComponents';

const HomeItem = ({ item }) => {
    return (
        <StyledView className="p-4 m-2 bg-orange-400 rounded-lg">
            <StyledText className="text-lg font-bold">{item.name}</StyledText>
            <StyledText>{item.email}</StyledText>
            <StyledText>{item.phone}</StyledText>
            <StyledText>{item.address.city}, {item.address.street}</StyledText>
        </StyledView>
    );
};

export default HomeItem;
