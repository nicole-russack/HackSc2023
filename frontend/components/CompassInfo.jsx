import React from "react"
import {
  Text,
  Center,
  Container,
  ScrollView,
  Icon,
  IconButton,
  VStack,
  Divider,
  Slider,
  Box,
  Button,
  Pressable,
  Input,
} from "native-base"
import { Animated, Keyboard } from "react-native"
import { useState, useEffect, useRef } from "react"
import { Ionicons } from '@expo/vector-icons'

// services
import celestialObjectsServices from '../services/celestialObjectsServices'

const CompassInfo = (props) => {

    // objects
    const [celestialObjects, setCelestialObjects] = useState({
        planets: [
        {
            name: 'Mercury',
        },
        {
            name: 'Venus',
        },
        {
            name: 'Earth',
        },
        {
            name: 'Mars',
        },
        ],
        moons: [

        ]
    })
    const [allCelestialObjects, setAllCelestialObjects] = useState(celestialObjects.planets)
    const [isCelestialObjectsLoaded, setIsCelestialObjectsLoaded] = useState(false)
    useEffect(() => {

        const getCelestialObjects = async () => {
        setCelestialObjects(await celestialObjectsServices.getAllObjects())

        // add to make allCelestialObjects
        var _allCelestialObjects = []
        _allCelestialObjects = _allCelestialObjects.concat(celestialObjects.planets)
        // setAllCelestialObjects(_allCelestialObjects)

        }
        getCelestialObjects()
    }, [])

    // user celestial object input
    const [objectInput, setObjectInput] = useState("")
    const [objectsFiltered, setObjectsFiltered] = useState(allCelestialObjects)
    const [isFilteringObjects, setIsFilteringObjects] = useState(false)
    const filterObjects = () => {

    // if user input blank, save filteredObjects as allCelestialObjects
    if (objectInput.length < 1) {
        setObjectsFiltered(allCelestialObjects)
    } else {

        // get current user input
        const currObjectInput = objectInput.toLowerCase()

        // set is filtering
        setIsFilteringObjects(true)

        // filter
        var _objectsFiltered = []
        for (var i=0; i<allCelestialObjects.length; ++i) {
        // if this object starts with the same string as currently in input, push to objectsFiltered
            if (allCelestialObjects[i].name.toLowerCase().startsWith(currObjectInput)) {
                _objectsFiltered.push(allCelestialObjects[i])
            }
        }
            // save objectsFiltered
            setObjectsFiltered(_objectsFiltered)
        }
    }
    const handleChangeObjectInput = (newObjectInput) => {
        // deactivate object, if active
        if (activeObject) {
            setActiveObject(null)
            props.setActiveObject(null)
        }
        // set input
        setObjectInput(newObjectInput)
    }
    // when objectInput changes, filterObjects and check suggestionsBoxHeight
    const [suggestionsBoxIsOpen, setSuggestionBoxIsOpen] = useState(false)
    useEffect(() => {
        filterObjects()
        // if (objectInput.length > 0 && !suggestionsBoxIsOpen) {
        //   setSuggestionBoxIsOpen(true)
        //   openSuggestionsBoxAnimation.start()
        // } else if (objectInput.length == 0 && suggestionsBoxIsOpen) {
        //   setSuggestionBoxIsOpen(false)
        //   closeSuggestionsBoxAnimation.start()
        // }
    }, [objectInput])

    // suggestions box height animation
    const suggestionsBoxHeight = useRef(new Animated.Value(0)).current;
    const openSuggestionsBoxAnimation = Animated.spring(suggestionsBoxHeight, {
        toValue: 200,
        speed: 20,
        useNativeDriver: false,
    })
    const closeSuggestionsBoxAnimation = Animated.spring(suggestionsBoxHeight, {
        toValue: 0,
        speed: 20,
        bounciness: 0,
        useNativeDriver: false,
    })

    const openSuggestionsBox = () => {
        setSuggestionBoxIsOpen(true)
        openSuggestionsBoxAnimation.start()
    }

    const closeSuggestionsBox = () => {
        setSuggestionBoxIsOpen(false)
        closeSuggestionsBoxAnimation.start()
    }

    // when user presses enter in object search bar
    const handleSearchSubmit = () => {
        setActiveObject(null)
        props.setActiveObject(null)
        closeSuggestionsBox()
    }

    // active celestial object
    const [activeObject, setActiveObject] = useState(null)
    const activateObject = (filteredObjectIndex) => {

        console.log('activate ' + filteredObjectIndex)

        // set active object
        setActiveObject(objectsFiltered[filteredObjectIndex])
        props.setActiveObject(objectsFiltered[filteredObjectIndex])

        // set objectInput to object name
        setObjectInput(objectsFiltered[filteredObjectIndex].name)

        // dismiss keyboard
        Keyboard.dismiss()

        // close suggestions box
        closeSuggestionsBox()
    }

    // time menu
    const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false)
    const [hoursOffset, setHoursOffset] = useState(0)
    const [daysOffset, setDaysOffset] = useState(0)
    const [monthsOffset, setMonthsOffset] = useState(0)
    const [yearsOffset, setYearsOffset] = useState(0)
    const handleSubmitTime = () => {

        // close time menu
        setIsTimeMenuOpen(false)

        // submit and fetch new data
        console.log(hoursOffset, daysOffset, monthsOffset, yearsOffset)
    }

    return (
        <Center>
          <Container style={{overflow: 'hidden'}}>

            {/* Celestial Object Search */}
            <Input variant='underlined' size='md' placeholder='Celestial object...' style={{color: 'white', marginLeft: 10, zIndex: 30}} onChangeText={handleChangeObjectInput}
              InputLeftElement={<Icon as={Ionicons} name="search" size='md' color='white' />} onPressOut={openSuggestionsBox} onSubmitEditing={handleSearchSubmit}
              value={objectInput} />
            
            {/* Suggestions Box - only viewable while user typing */}
            <Animated.View style={{display: 'flex', borderWidth: 5, height: suggestionsBoxHeight, width: 400, padding: 10, overflow: 'hidden'}}>
              <ScrollView style={{overflow: 'hidden'}} keyboardShouldPersistTaps='handled'>
                {objectsFiltered.map((object, index) =>
                <Box key={index} style={{overflow: 'hidden'}}>
                  <Pressable onPress={() => activateObject(index)} style={{height: 40, display: 'flex', justifyContent: 'center'}}>
                    <Text style={{color: 'white'}}>{object.name}</Text>
                  </Pressable>
                  <Divider style={{backgroundColor: 'gray'}} />
                </Box>
                )}
              </ScrollView>
            </Animated.View>

            {/* Active Object - only viewable if selected */}
            {activeObject ? 
              <Box style={{width: 400}}>
                <Box style={{display: 'flex', width: 400, alignItems: 'flex-start'}}>
                  <IconButton icon={<Icon as={Ionicons} name="time" size='md' color='white' />} onPress={() => setIsTimeMenuOpen(!isTimeMenuOpen)} />
                </Box>

                {/* Time Menu */}
                {isTimeMenuOpen ?
                  <Box style={{width: 300, padding: 20}}>

                  <VStack>
                    <Text style={{color: 'gray'}}>Hours: {hoursOffset}</Text>
                    <Slider size='md' onChange={(newValue) => setHoursOffset(newValue)} defaultValue={0} minValue={-23} maxValue={23}>
                      <Slider.Track>
                        <Slider.FilledTrack />
                      </Slider.Track>
                      <Slider.Thumb style={{backgroundColor: 'gray'}} />
                    </Slider>

                    <Text style={{color: 'gray'}}>Days: {daysOffset}</Text>
                    <Slider size='md' onChange={(newValue) => setDaysOffset(newValue)} defaultValue={0} minValue={-30} maxValue={30}>
                      <Slider.Track>
                        <Slider.FilledTrack />
                      </Slider.Track>
                      <Slider.Thumb style={{backgroundColor: 'gray'}} />
                    </Slider>

                    <Text style={{color: 'gray'}}>Months: {monthsOffset}</Text>
                    <Slider size='md' onChange={(newValue) => setMonthsOffset(newValue)} defaultValue={0} minValue={-11} maxValue={11}>
                      <Slider.Track>
                        <Slider.FilledTrack />
                      </Slider.Track>
                      <Slider.Thumb style={{backgroundColor: 'gray'}} />
                    </Slider>

                    <Text style={{color: 'gray'}}>Years: {yearsOffset}</Text>
                    <Slider size='md' onChange={(newValue) => setYearsOffset(newValue)} defaultValue={0} minValue={-123} maxValue={27}>
                      <Slider.Track>
                        <Slider.FilledTrack />
                      </Slider.Track>
                      <Slider.Thumb style={{backgroundColor: 'gray'}} />
                    </Slider>

                  <Box style={{alignItems: 'flex-end', marginTop: 20}}>
                    <Button onPress={handleSubmitTime}>Calculate</Button>
                  </Box>

                  </VStack>

                  </Box> : null
                }
              </Box> : null
            }

          </Container>
        </Center>
    )
}

export default CompassInfo