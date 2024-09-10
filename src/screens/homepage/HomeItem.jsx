import React from 'react';
import { StyledText, StyledView } from '@common/StyledComponents';

const HomeItem = ({ item }) => {
    return (
        <StyledView className="p-4 m-2 bg-orange-400 rounded-lg">
            <StyledText className="text-lg font-bold">{item.title}</StyledText>
        </StyledView>
    );
};

export default HomeItem;
