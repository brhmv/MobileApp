import { StyledView, StyledTextInput, StyledText, } from '@common/StyledComponents';

const Input = ({
    inputName,
    inputValue,
    handleInputChange,
    placeholder,
    error,
    multiline = false,
    height,
}) => (
    <StyledView className="w-full relative mb-3">
        <StyledTextInput
            style={{ height: height ? height : 45 }}
            multiline={multiline}
            value={inputValue}
            placeholder={placeholder}
            name={inputName}
            placeholderTextColor={error ? '#FF3115' : '#868782'}
            onChangeText={value =>
                handleInputChange(
                    inputName,
                    inputName === 'email' ? value.toLowerCase() : value,
                )
            }
            className={`border-[1px] text-black font-poppi text-base placeholder:font-poppi ${error
                ? 'border-red-400 bg-red-50'
                : 'border-[#EDEFF3] bg-white focus:border-[#2e73db] focus:bg-[#F3F7FF]'
                } h-[45px] rounded-[18px] px-4`}
        />
        <StyledText
            className={`text-red-400 text-xs font-serrat mt-1 ${error ? 'block' : 'hidden'
                }`}>
            {error}
        </StyledText>
    </StyledView>
);

export default Input;