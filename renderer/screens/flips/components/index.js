/* eslint-disable react/prop-types */
import React from 'react'
import NextLink from 'next/link'
import {
  SimpleGrid,
  Image,
  Text,
  Box,
  Flex,
  Menu,
  MenuButton,
  Icon,
  MenuItem,
  MenuList,
  PseudoBox,
  Button,
  RadioButtonGroup,
  Stack,
  useTheme,
  Heading,
  AspectRatioBox,
  Divider,
  VisuallyHidden,
  FormLabel,
  CloseButton,
  IconButton,
  FormControl,
  Input,
  Textarea,
  Collapse,
  useDisclosure,
  Link,
} from '@chakra-ui/core'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import FlipEditor from './flip-editor'
import {Step} from '../types'
import {formatKeywords} from '../utils'
import {hasImageType} from '../../../shared/utils/img'
import {PageTitle} from '../../app/components'
import {PrimaryButton, IconButton2} from '../../../shared/components/button'
import {rem} from '../../../shared/theme'
import {capitalize} from '../../../shared/utils/string'
import {reorder} from '../../../shared/utils/arr'

export function FlipPageTitle({onClose, ...props}) {
  return (
    <Flex align="center" alignSelf="stretch" justify="space-between" my={6}>
      <PageTitle mb={0} {...props} />
      <CloseButton onClick={onClose} />
    </Flex>
  )
}

export function FlipCardList(props) {
  return <SimpleGrid columns={4} spacing={10} {...props} />
}

export function FlipCardImage(props) {
  return (
    <Image
      objectFit="cover"
      borderWidth="1px"
      borderColor="brandGray.016"
      // boxShadow={`0 0 0 1px ${colors.brandGray['016']}`}
      rounded="lg"
      height="full"
      {...props}
    />
  )
}

export function FlipCardImageBox({children, ...props}) {
  return (
    <AspectRatioBox h={150} w={150} position="relative" {...props}>
      <Box>{children}</Box>
    </AspectRatioBox>
  )
}

export function FlipCardTitle(props) {
  return <Text fontWeight={500} mb="px" {...props} />
}

export function FlipCardSubtitle(props) {
  return <Text color="muted" {...props} />
}

export function FlipCardMenu(props) {
  return (
    <Menu autoSelect={false}>
      <MenuButton
        rounded="md"
        py="3/2"
        px="2px"
        mt="-6px"
        _expanded={{bg: 'gray.50'}}
        _focus={{outline: 0}}
      >
        <Icon name="more" size={5} />
      </MenuButton>
      <MenuList
        placement="bottom-end"
        border="none"
        shadow="0 4px 6px 0 rgba(83, 86, 92, 0.24), 0 0 2px 0 rgba(83, 86, 92, 0.2)"
        rounded="lg"
        py={2}
        minWidth="145px"
        {...props}
      />
    </Menu>
  )
}

export function FlipCardMenuItem(props) {
  return (
    <PseudoBox
      as={MenuItem}
      fontWeight={500}
      px={3}
      py="3/2"
      _hover={{bg: 'gray.50'}}
      _focus={{bg: 'gray.50'}}
      _selected={{bg: 'gray.50'}}
      _active={{bg: 'gray.50'}}
      {...props}
    />
  )
}

export function FlipCardMenuItemIcon(props) {
  return <Icon size={5} mr={3} color="brand.blue" {...props} />
}

export function RequiredFlipPlaceholder({title}) {
  return (
    <Box cursor="pointer">
      <NextLink href="/flips/new" passHref>
        <Link display="inline-block" _hover={null}>
          <EmptyFlipBox>
            <FlipPlaceholder />
          </EmptyFlipBox>
        </Link>
      </NextLink>
      <Box mt={4}>
        <FlipCardTitle>{title}</FlipCardTitle>
        <FlipCardSubtitle>Required</FlipCardSubtitle>
      </Box>
    </Box>
  )
}

export function OptionalFlipPlaceholder({title, isDisabled}) {
  return (
    <Box
      cursor={isDisabled ? 'pointer' : 'auto'}
      opacity={isDisabled ? 0.5 : 1}
    >
      {isDisabled ? (
        <EmptyFlipBox>
          <FlipPlaceholder />
        </EmptyFlipBox>
      ) : (
        <NextLink href="/flips/new" passHref>
          <Link display="inline-block" _hover={null}>
            <EmptyFlipBox>
              <FlipPlaceholder />
            </EmptyFlipBox>
          </Link>
        </NextLink>
      )}
      <Box mt={4}>
        <FlipCardTitle>{title}</FlipCardTitle>
        <FlipCardSubtitle>Optional</FlipCardSubtitle>
      </Box>
    </Box>
  )
}

export function EmptyFlipBox(props) {
  return (
    <PseudoBox
      animation="pulse 1s"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderWidth={2}
      borderColor="rgb(210, 212, 217)"
      borderStyle="dashed"
      color="rgb(210, 212, 217)"
      h={150}
      w={150}
      rounded="lg"
      transition="all 0.3s ease"
      _hover={{color: 'brand.blue'}}
      {...props}
    />
  )
}

export function FlipPlaceholder(props) {
  return <Icon name="plus-solid" size={8} {...props} />
}

export function FlipOverlay(props) {
  return (
    <Flex
      rounded="lg"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={99}
      {...props}
    />
  )
}

export function FlipOverlayStatus(props) {
  return (
    <Stack
      isInline
      spacing={1}
      align="center"
      color="white"
      fontWeight={500}
      mt="auto"
      ml={2}
      mb={2}
      {...props}
    />
  )
}

export function FlipOverlayIcon(props) {
  return <Icon size={5} {...props} />
}

export function FlipOverlayText(props) {
  return <Text fontWeight={500} {...props} />
}

export function FlipFilter(props) {
  return <RadioButtonGroup isInline spacing={2} {...props} />
}

export const FlipFilterOption = React.forwardRef(
  ({isChecked, ...props}, ref) => (
    <Button
      ref={ref}
      isActive={isChecked}
      aria-checked={isChecked}
      role="radio"
      bg="white"
      color="muted"
      fontWeight={500}
      size="sm"
      fontSize="md"
      _active={{bg: 'gray.50', color: 'brand.blue'}}
      _hover={{bg: 'gray.50', color: 'brand.blue'}}
      {...props}
      variant="ghost"
      variantColor="gray"
    />
  )
)
FlipFilterOption.displayName = 'FlipFilterOption'

// Entering flip master land
export function FlipMaster(props) {
  return props.children
}

export function FlipMasterNavbar(props) {
  return (
    <Stack
      isInline
      align="center"
      alignSelf="stretch"
      spacing={8}
      bg="gray.50"
      minH={12}
      fontWeight={500}
      mx={-20}
      mb={6}
      px={20}
      {...props}
    />
  )
}

export function FlipMasterNavbarItem({step, ...props}) {
  return (
    <Stack
      role="group"
      isInline
      spacing={2}
      align="center"
      cursor="default"
      {...props}
    >
      <FlipMasterNavbarItemIcon step={step} />
      <FlipMasterNavbarItemText step={step} {...props} />
    </Stack>
  )
}

function FlipMasterNavbarItemIcon({step, ...props}) {
  return (
    <PseudoBox
      as={Flex}
      justifyContent="center"
      alignItems="center"
      bg={
        // eslint-disable-next-line no-nested-ternary
        step === Step.Active
          ? 'brandBlue.10'
          : step === Step.Completed
          ? 'brandBlue.500'
          : 'transparent'
      }
      border="2px"
      borderColor={step === Step.Next ? '#d2d4d9' : 'brandBlue.500'}
      color="white"
      rounded="full"
      w={4}
      h={4}
      transition="all 0.2s ease"
      {...props}
    >
      <Icon
        name="ok"
        size={3}
        opacity={step === Step.Completed ? 1 : 0}
        transition="all 0.2s ease"
      />
    </PseudoBox>
  )
}

export function FlipMasterNavbarItemText({step, ...props}) {
  let color = 'brand.gray'

  switch (step) {
    default:
    case Step.Next:
      color = 'muted'
      break
    case Step.Completed:
    case Step.Active:
      color = 'brand.gray'
      break
  }

  return (
    <PseudoBox
      as={Text}
      color={color}
      transition="all 0.3s ease"
      _groupHover={{
        color: 'brand.gray',
      }}
      {...props}
    />
  )
}

export function FlipStoryStep({children}) {
  return (
    <FlipStep>
      <FlipStepHeader mb={8}>
        <FlipStepTitle>Think up a story</FlipStepTitle>
        <FlipStepSubtitle>
          Think up a short story about someone/something related to the two key
          words below according to the template: “Before — Something happens —
          After"
        </FlipStepSubtitle>
      </FlipStepHeader>
      {children}
    </FlipStep>
  )
}

export function FlipKeywordPanel(props) {
  return (
    <Box bg="gray.50" px={10} py={8} rounded="lg" w="480px" {...props}></Box>
  )
}

export function FlipKeywordPair(props) {
  return <Stack isInline spacing={10} {...props} />
}

export function FlipKeyword(props) {
  return <Stack spacing="1/2" flex={1} {...props}></Stack>
}

export function FlipKeywordName(props) {
  return <Text fontWeight={500} {...props} />
}
export function FlipKeywordDescription(props) {
  return <Text color="muted" {...props} />
}

export function FlipStoryAside(props) {
  return <Stack spacing={1} {...props}></Stack>
}

export function FlipEditorStep({keywords, images, onChangeImage}) {
  const [currentIndex, setCurrentIdx] = React.useState(0)
  return (
    <FlipStep>
      <FlipStepHeader>
        <FlipStepTitle>Select 4 images to tell your story</FlipStepTitle>
        <FlipStepSubtitle>
          Use keywords for the story{' '}
          <Text as="mark">{formatKeywords(keywords)}</Text> and template "Before
          – Something happens – After".
        </FlipStepSubtitle>
      </FlipStepHeader>
      <Stack isInline spacing={10}>
        <FlipImageList>
          {images.map((src, idx) => (
            <SelectableFlipImageListItem
              key={src}
              src={src}
              isActive={idx === currentIndex}
              onClick={() => setCurrentIdx(idx)}
            />
          ))}
        </FlipImageList>
        <Box>
          {/* <FlipImage src={images[currentIndex]} width={400} rounded="md" /> */}
          {images.map((src, idx) => (
            <FlipEditor
              idx={idx}
              visible={currentIndex === idx}
              src={src}
              onChange={url => onChangeImage(url, idx)}
              onChanging={() => {
                console.log()
                // onChangingImage(idx)
              }}
            />
          ))}
          {false && (
            <Stack isInline align="center" spacing={3} mt={6}>
              <Box>
                <FlipEditorIcon name="google" />
              </Box>
              <Box>
                <FormLabel htmlFor="file" p={0}>
                  <FlipEditorIcon name="folder" />
                </FormLabel>
                <VisuallyHidden>
                  <input
                    id="file"
                    type="file"
                    onChange={async e => {
                      const {files} = e.target
                      if (files.length) {
                        const [file] = files
                        if (hasImageType(file)) {
                          onChangeImage(URL.createObjectURL(file), currentIndex)
                        }
                      }
                    }}
                  />
                </VisuallyHidden>
              </Box>
              <Divider
                borderColor="gray.300"
                borderWidth="px"
                orientation="vertical"
                mx={0}
                h={6}
              />
              <FlipEditorIcon name="add-image" />
            </Stack>
          )}
        </Box>
      </Stack>
    </FlipStep>
  )
}

export function FlipEditorIcon(props) {
  return (
    <PseudoBox
      as={Icon}
      size={5}
      _hover={{color: 'brandBlue.500'}}
      {...props}
    />
  )
}

export function FlipShuffleStep({
  images,
  order,
  onShuffle,
  onManualShuffle,
  onReset,
}) {
  return (
    <FlipStep alignSelf="stretch">
      <FlipStepHeader>
        <FlipStepTitle>Shuffle images</FlipStepTitle>
        <FlipStepSubtitle>
          Shuffle images in a way to make a nonsense sequence of images
        </FlipStepSubtitle>
      </FlipStepHeader>
      <Stack isInline spacing={10} align="center" justify="flex-end">
        <Stack isInline spacing={10} justify="center">
          <FlipImageList>
            {images.map((src, idx) => (
              <FlipImageListItem key={idx} src={src} opacity={0.3} />
            ))}
          </FlipImageList>
          <DragDropContext
            onDragEnd={result => {
              if (!result.destination) {
                return
              }

              if (result.destination.index === result.source.index) {
                return
              }

              const nextOrder = reorder(
                order,
                result.source.index,
                result.destination.index
              )

              onManualShuffle(nextOrder)
            }}
          >
            <Droppable droppableId="flip">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <FlipImageList>
                    {order.map((num, idx) => (
                      <Draggable
                        key={num}
                        draggableId={`pic-${num}`}
                        index={idx}
                      >
                        {/* eslint-disable-next-line no-shadow */}
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <FlipImageListItem key={num} src={images[num]} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </FlipImageList>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Stack>
        <Stack spacing={0} minW={rem(200)} align="flex-start">
          <IconButton2 icon="cycle" onClick={onShuffle}>
            Shuffle images
          </IconButton2>
          <IconButton2 icon="undo" onClick={onReset}>
            Reset to default
          </IconButton2>
        </Stack>
      </Stack>
    </FlipStep>
  )
}

export function FlipSubmitStep({children}) {
  return (
    <FlipStep alignSelf="stretch">
      <FlipStepHeader>
        <FlipStepTitle>Submit flip</FlipStepTitle>
        <FlipStepSubtitle>
          Submit flip to publish it to the Idena network
        </FlipStepSubtitle>
      </FlipStepHeader>
      {children}
    </FlipStep>
  )
}

export function FlipStep(props) {
  return <Flex direction="column" flex={1} {...props} />
}

export function FlipStepHeader(props) {
  return <Box mb={6} {...props} />
}

export function FlipStepTitle(props) {
  return <Heading as="h2" fontSize="lg" fontWeight={500} mb={1} {...props} />
}

export function FlipStepSubtitle(props) {
  return <Text color="muted" {...props} />
}

export function FlipStepBody(props) {
  return <Stack isInline spacing={10} {...props} />
}

export function FlipMasterFooter(props) {
  return (
    <Box
      alignSelf="stretch"
      borderTop="1px"
      borderTopColor="gray.300"
      mt="auto"
      px={4}
      py={3}
    >
      <Stack isInline spacing={2} justify="flex-end" {...props} />
    </Box>
  )
}

export function FlipImageList({children, ...props}) {
  return (
    <Stack spacing={0} {...props}>
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, {
          isFirst: idx === 0,
          isLast: idx === React.Children.count(children) - 1,
        })
      )}
    </Stack>
  )
}

function SelectableFlipImageListItem({isActive, isFirst, isLast, ...props}) {
  const {colors} = useTheme()
  return (
    <PseudoBox
      position="relative"
      _before={{
        content: `""`,
        roundedTop: isFirst ? 'md' : 0,
        roundedBottom: isLast ? 'md' : 0,
        boxShadow: isActive
          ? `0 0 0 4px ${colors.brandBlue['025']}, inset 0 0 0 2px ${colors.brandBlue['500']}`
          : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: isActive ? 'docked' : 'base',
      }}
    >
      <FlipImageListItem isFirst={isFirst} isLast={isLast} {...props} />
    </PseudoBox>
  )
}

export function FlipImageListItem({isFirst, isLast, ...props}) {
  return (
    <FlipImage
      roundedTop={isFirst ? 'md' : 0}
      roundedBottom={isLast ? 'md' : 0}
      borderBottomWidth={isLast ? '1px' : 0}
      width={120}
      {...props}
    />
  )
}

export function FlipImage({src, ...props}) {
  return (
    <AspectRatioBox
      ratio={4 / 3}
      bg="gray.50"
      border="1px"
      borderColor="brandGray.016"
      {...props}
    >
      {src ? (
        <Image
          src={src}
          objectFit="scale-down"
          fallbackSrc="/static/flips-cant-icn.svg"
        />
      ) : (
        <EmptyFlipImage />
      )}
    </AspectRatioBox>
  )
}

export function EmptyFlipImage(props) {
  return (
    <Flex align="center" justify="center" px={10} py={6} {...props}>
      <Icon name="pic" size={10} color="gray.100" />
    </Flex>
  )
}

export function CommunityTranslations({keywords, onVote, onSuggest}) {
  const [wordIdx, setWordIdx] = React.useState(0)
  const {isOpen, onToggle} = useDisclosure()

  return (
    <Stack spacing={8}>
      <IconButton2
        icon="community"
        color="brandFray.500"
        px={0}
        _hover={{background: 'transparent'}}
        onClick={onToggle}
      >
        Community translation
        <Icon size={5} name="chevron-down" color="muted" ml={2}></Icon>
      </IconButton2>
      <Collapse isOpen={isOpen}>
        <Stack spacing={8}>
          <RadioButtonGroup isInline value={wordIdx} onChange={setWordIdx}>
            {keywords.words.map(({id, name}, i) => (
              <FlipKeywordRadio key={id} value={i}>
                {capitalize(name)}
              </FlipKeywordRadio>
            ))}
          </RadioButtonGroup>
          {keywords.translations[wordIdx].map(({id, name, desc, ups}) => (
            <Flex key={id} justify="space-between">
              <FlipKeyword>
                <FlipKeywordName>{name}</FlipKeywordName>
                <FlipKeywordDescription>{desc}</FlipKeywordDescription>
              </FlipKeyword>
              <Stack isInline spacing={2} align="center">
                <VoteButton
                  icon="upvote"
                  onClick={() => onVote({id, up: true})}
                />
                <Flex
                  align="center"
                  justify="center"
                  bg="green.010"
                  color="green.500"
                  fontWeight={500}
                  rounded="md"
                  minW={12}
                  minH={8}
                  style={{fontVariantNumeric: 'tabular-nums'}}
                >
                  {ups}
                </Flex>
                <VoteButton
                  icon="upvote"
                  color="muted"
                  transform="rotate(180deg)"
                  onClick={() => onVote({id, up: false})}
                />
              </Stack>
            </Flex>
          ))}
          <Divider borderColor="gray.300" />
          <Box>
            <Text fontWeight={500} mb={3}>
              Suggest translation
            </Text>
            <form
              onSubmit={e => {
                e.preventDefault()
                const {
                  nameInput: {value: name},
                  descInput: {value: desc},
                } = e.target.elements
                onSuggest({wordIdx, name, desc: desc.trim()})
              }}
            >
              <FormControl>
                <Input
                  id="nameInput"
                  placeholder={capitalize(keywords.words[wordIdx].name)}
                  px={3}
                  pt="3/2"
                  pb={2}
                  borderColor="gray.300"
                  mb={2}
                  _placeholder={{
                    color: 'muted',
                  }}
                />
                <Textarea
                  id="descInput"
                  placeholder={capitalize(keywords.words[wordIdx].desc)}
                  borderColor="gray.300"
                  px={3}
                  pt="3/2"
                  pb={2}
                  mb={6}
                  _placeholder={{
                    color: 'muted',
                  }}
                />
              </FormControl>
              <PrimaryButton type="submit" display="flex" ml="auto">
                Send
              </PrimaryButton>
            </form>
          </Box>
        </Stack>
      </Collapse>
    </Stack>
  )
}

export const FlipKeywordRadio = React.forwardRef(
  ({isChecked, ...props}, ref) => {
    const stateProps = {
      bg: isChecked ? 'brandBlue.500' : 'transparent',
      color: isChecked ? 'white' : 'brandGray.500',
    }

    return (
      <PrimaryButton
        ref={ref}
        aria-checked={isChecked}
        role="radio"
        {...stateProps}
        _hover={{
          ...stateProps,
        }}
        _active={{
          ...stateProps,
        }}
        {...props}
      />
    )
  }
)
FlipKeywordRadio.displayName = 'FlipKeywordRadio'

export function VoteButton(props) {
  return (
    <IconButton
      bg="transparent"
      color="brandGray.500"
      fontSize={rem(20)}
      h={5}
      w={5}
      _hover={{bg: 'transparent'}}
      {...props}
    />
  )
}
