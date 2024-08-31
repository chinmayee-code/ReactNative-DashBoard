import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StackedBarChart} from 'react-native-chart-kit';
import {
  Avatar,
  Box,
  Container,
  HStack,
  Image,
  Menu,
  Pressable,
  Row,
  ScrollView,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import {AppIcon} from '~/components/core';
import {COLORS, FONTS} from '~/styles';
import {IMAGES} from '~/assets';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {days, months} from '~/constant/day-month';

const DashBoard = () => {
  const [selectedOption, setSelectedOption] = useState('week');

  // const Dashboard_Card = [
  //   {
  //     id: '1',
  //     value: '6790',
  //     icon: (
  //       <AppIcon IoniconsName="people-outline" size={24} color={'#000080'} />
  //     ),
  //     title: 'Total Visitors',
  //     icon2: <AppIcon AntDesignName="arrowup" size={16} color={'#008000'} />,
  //     rate: '16.23%',
  //   },
  //   {
  //     id: '2',
  //     value: '2345',
  //     icon: <AppIcon EntypoName="line-graph" size={18} color={'#000080'} />,
  //     title: 'Total Sales',
  //     icon2: <AppIcon AntDesignName="arrowup" size={16} color={'#008000'} />,
  //     rate: '31.4%',
  //   },
  //   {
  //     id: '3',
  //     value: '6778',
  //     icon: <AppIcon MaterialIconsName="money" size={18} color={'#000080'} />,
  //     title: 'Transactions',
  //     icon2: <AppIcon AntDesignName="arrowup" size={16} color={'#008000'} />,
  //     rate: '10%',
  //   },
  //   {
  //     id: '4',
  //     value: '9876',

  //     icon: <AppIcon FontistoName="smiling" size={18} color={'#000080'} />,
  //     title: ' Total Review',
  //     icon2: <AppIcon AntDesignName="arrowdown" size={16} color={'#FF0000'} />,
  //     rate: '-1.3%',
  //   },
  // ];

  const [data, setData] = useState<any[]>([]);
  const [dashBoardData, setDashBoardData] = useState<any[]>([]);

  const filteredData = useMemo(() => {
    return data.filter(item => item.type === selectedOption);
  }, [selectedOption, data]);

  const mapPeriodName = (period: string): string => {
    return (
      days[period as keyof typeof days] ||
      months[period as keyof typeof months] ||
      period
    );
  };
  const labels = filteredData.map(item => mapPeriodName(item.period));
  const salesData = filteredData.map(item => item.sales);
  const ordersData = filteredData.map(item => item.orders);

  const chartData = {
    labels: labels,
    legend: ['Sales', 'Orders'],
    data: salesData.map((sale, index) => [sale, ordersData[index]]),
    barColors: ['#B6D0E2', '#4169E1'],
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://192.168.29.233:8000/api/v1/dashboard/barchat`, //Here i have used my laptops ip address in place of localhost

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer token`,
          },
        },
      );
      // console.log(res.data);

      if (res.status === 200) {
        setData(res.data?.data);
      }
    } catch (e) {
      console.error('error', e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
      fetchDashboardData();
    }, []),
  );

  // useEffect(() => {
  //   fetchData();
  // }, [selectedOption]);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        `http://192.168.29.233:8000/api/v1/dashboard/dashboard-data`, //Here i have used my laptops ip address in place of localhost

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer token`,
          },
        },
      );
      // console.log(res.data);

      if (res.status === 200) {
        setDashBoardData(res.data?.data);
      }
    } catch (e) {
      console.error('error', e);
    }
  };
  return (
    <Box safeAreaTop flex={1} bgColor={'white'}>
      <Row
        justifyContent={'space-between'}
        p={1}
        alignItems={'center'}
        backgroundColor={'#fff'}>
        <HStack alignItems={'center'}>
          <Avatar
            bg="green.500"
            size="sm"
            m={3}
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}>
            {' '}
            AJ
          </Avatar>
          <HStack alignItems={'center'}>
            <Text fontFamily={FONTS[400].normal} fontSize={20}>
              Good Morning
            </Text>
            <Image source={IMAGES.HAND} alt="Alternate Text" size="2xs" m="1" />
          </HStack>
        </HStack>

        <AppIcon
          size={23}
          style={{margin: 10}}
          color={COLORS.primary}
          IoniconsName="notifications-outline"
        />
      </Row>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          pb: 20,
        }}>
        <Row flexWrap={'wrap'} m={2}>
          {dashBoardData?.map((item, index) => (
            <Pressable
              key={item?.id}
              bgColor={'white'}
              shadow={3}
              alignSelf={'center'}
              borderRadius={10}
              w={'45%'}
              overflow={'hidden'}
              m={2}>
              <VStack space={2} p={2}>
                <HStack justifyContent={'space-between'}>
                  <Box
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={'10'}
                    h={'10'}
                    shadow={2}
                    bgColor={'blue.200'}
                    borderRadius={10}>
                    {/* <AppIcon
                      size={24}
                      color={'#000080'}
                      name={
                        item.title === 'Total Visitors'
                          ? 'people-outline'
                          : item.title === 'Total Sales'
                          ? 'line-graph'
                          : item.title === 'Transactions'
                          ? 'money'
                          : 'smiling' // Default icon
                      }
                    /> */}
                    {item.title === 'Total Visitors' ? (
                      <AppIcon
                        IoniconsName="people-outline"
                        size={24}
                        color={'#000080'}
                      />
                    ) : item.title === 'Total Sales' ? (
                      <AppIcon
                        EntypoName="line-graph"
                        size={18}
                        color={'#000080'}
                      />
                    ) : item.title === 'Transactions' ? (
                      <AppIcon
                        MaterialIconsName="money"
                        size={18}
                        color={'#000080'}
                      />
                    ) : (
                      <AppIcon
                        FontistoName="smiling"
                        size={18}
                        color={'#000080'}
                      />
                    )}
                  </Box>

                  <Box
                    bgColor={'#fff'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={30}
                    px={2}>
                    <AppIcon
                      EntypoName="dots-three-vertical"
                      size={14}
                      color={COLORS.primary}
                    />
                  </Box>
                </HStack>

                <Text
                  fontSize={'sm'}
                  textTransform={'capitalize'}
                  fontFamily={FONTS[300].normal}
                  fontWeight={'bold'}
                  top={1}>
                  {item?.title}
                </Text>
                <HStack alignItems={'center'} space={2}>
                  <Text
                    textAlign={'left'}
                    fontSize={'sm'}
                    fontWeight={'semibold'}
                    fontFamily={FONTS[500].normal}>
                    {item?.value}
                  </Text>
                  <Box>
                    <Text
                      textAlign={'left'}
                      color={parseFloat(item.rate) > 0 ? '#008000' : '#FF0000'}
                      fontSize={'sm'}
                      fontWeight={'bold'}
                      fontFamily={FONTS[400].normal}>
                      {parseFloat(item.rate) > 0 ? (
                        <AppIcon
                          AntDesignName="arrowup"
                          size={16}
                          color={'#008000'}
                        />
                      ) : (
                        <AppIcon
                          AntDesignName="arrowdown"
                          size={16}
                          color={'#FF0000'}
                        />
                      )}
                      {item.rate}
                    </Text>
                  </Box>
                </HStack>
                <Text
                  textAlign={'left'}
                  color={'#808080'}
                  fontSize={'xs'}
                  fontFamily={FONTS[400].normal}>
                  From last Weeks
                </Text>
              </VStack>
            </Pressable>
          ))}
        </Row>
        <Box shadow={2} bg={'white'} borderRadius={10} m={4}>
          <Box
            px={3}
            py={2}
            borderBottomWidth={1}
            borderColor={'gray.300'}
            borderStyle={'dotted'}>
            <HStack alignContent={'center'} justifyContent={'space-between'}>
              <Text
                fontSize={20}
                fontFamily={FONTS[400].normal}
                color={COLORS.secondary}>
                Sales Report
              </Text>

              <Box bgColor={'white'} shadow={3} p={1} borderRadius={10}>
                <Menu
                  w="170"
                  bgColor={'blue.50'}
                  trigger={triggerProps => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}>
                        <HStack space={1} padding={1}>
                          {selectedOption ? (
                            <Text fontFamily={FONTS[400].normal} fontSize={14}>
                              {selectedOption.charAt(0).toUpperCase() +
                                selectedOption.slice(1)}
                              ly
                            </Text>
                          ) : null}
                          <AppIcon
                            EntypoName="chevron-down"
                            size={21}
                            color={COLORS.secondary}
                          />
                        </HStack>
                      </Pressable>
                    );
                  }}>
                  <Menu.Item onPress={() => setSelectedOption('week')}>
                    <Pressable>
                      <Row alignItems={'center'} space={2}>
                        <Text fontFamily={FONTS[400].normal} fontSize={14}>
                          Weekly
                        </Text>
                      </Row>
                    </Pressable>
                  </Menu.Item>
                  <Menu.Item onPress={() => setSelectedOption('month')}>
                    <Pressable>
                      <Row alignItems={'center'} space={2}>
                        <Text fontFamily={FONTS[400].normal} fontSize={14}>
                          Monthly
                        </Text>
                      </Row>
                    </Pressable>
                  </Menu.Item>
                  <Menu.Item onPress={() => setSelectedOption('year')}>
                    <Pressable>
                      <Row alignItems={'center'} space={2}>
                        <Text fontFamily={FONTS[400].normal} fontSize={14}>
                          Yearly
                        </Text>
                      </Row>
                    </Pressable>
                  </Menu.Item>
                </Menu>
              </Box>
            </HStack>
          </Box>
          <>
            <StackedBarChart
              data={chartData}
              width={343}
              height={260}
              chartConfig={{
                backgroundColor: '#022173',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FCFCFD',
                strokeWidth: 2,
                barPercentage: 0.4,
                useShadowColorFromDataset: false,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(48, 25, 52,${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  stroke: '#efefef',
                  strokeDasharray: '0',
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              style={{
                marginVertical: 0,
                borderRadius: 2,
                alignSelf: 'center',
              }}
            />
          </>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default DashBoard;
