import {gql, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {Box, FlatList, ScrollView, Text} from 'native-base';
import React from 'react';
import {Content, List} from '~/components/core';
import {IconProps} from '~/components/core/AppIcon';
import {StackAndTabType} from '~/routes/private/types';

export default function Profile() {
  const {navigate} = useNavigation<StackAndTabType>();
  const listData: {
    title: string;
    subtitle?: string;
    avatar?: string;
    leftIcon?: IconProps;
    isHeading?: boolean;
    onPress?: () => void;
  }[] = [
    {
      title: 'Matt',
      subtitle: 'Show Profile',
      avatar:
        'https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4853539.png',
      onPress: () => navigate('Settings'),
    },
    {
      title: 'Account Settings',
      isHeading: true,
    },
    {
      title: 'Personal Information',
      leftIcon: {FeatherName: 'user'},
    },
    {
      title: 'Payments & Payouts',
      leftIcon: {FeatherName: 'credit-card'},
    },
    {
      title: 'Translation',
      leftIcon: {FeatherName: 'globe'},
    },
    {
      title: 'Notifications',
      leftIcon: {FeatherName: 'bell'},
    },
    {
      title: 'Support',
      isHeading: true,
    },
    {
      title: 'Get Help',
      leftIcon: {FeatherName: 'help-circle'},
    },
    {
      title: 'Safely Center',
      leftIcon: {FeatherName: 'shield'},
    },
    {
      title: 'Give Us Feedback',
      leftIcon: {FeatherName: 'message-square'},
    },
    {
      title: 'Legal',
      isHeading: true,
    },
    {
      title: 'Privacy Policy',
      leftIcon: {FeatherName: 'lock'},
    },
    {
      title: 'Terms of Service',
      leftIcon: {FeatherName: 'file-text'},
    },
    {
      title: 'About',
      leftIcon: {FeatherName: 'info'},
    },
    {
      title: 'Account Actions',
      isHeading: true,
    },
    {
      title: 'Logout',
      leftIcon: {FeatherName: 'log-out'},
    },
    {
      title: 'Change Password',
      leftIcon: {FeatherName: 'key'},
    },
    {
      title: 'Delete Account',
      leftIcon: {FeatherName: 'trash'},
    },
  ];
  const GET_DEVICES = gql`
    query getAllDevices(
      $filter: [FilterDevice]
      $search: String
      $sortPage: SortAndPageDevices
    ) {
      getAllDevices(filter: $filter, search: $search, sortPage: $sortPage) {
        content {
          slNo
          model
          name
          zone1
          zone2
          latitude
          longitude
          macAddress
          type
        }
        totalPages
        totalElements
        number
        size
        numberOfElements
        first
        last
        empty
      }
    }
  `;

  const {loading, data: queryData} = useQuery(GET_DEVICES, {
    fetchPolicy: 'network-only',
  });
  console.log('===>>', queryData?.getAllDevices?.content[0]);
  const deviceData = queryData?.getAllDevices?.content ?? [];

  // Render a single item
  const renderItem = ({item}: any) => {
    return (
      <Box
        padding={4}
        borderBottomWidth={1}
        borderColor="coolGray.200"
        key={item.slNo}>
        <Text bold>{item.name}</Text>
        <Text>Model: {item.model}</Text>
        <Text>Type: {item.type}</Text>
        <Text>MAC Address: {item.macAddress}</Text>
        <Text>Zone 1: {item.zone1}</Text>
        <Text>Zone 2: {item.zone2}</Text>
        <Text>Latitude: {item.latitude}</Text>
        <Text>Longitude: {item.longitude}</Text>
      </Box>
    );
  };

  return (
    <Box flex={1}>
      <FlatList
        data={deviceData}
        keyExtractor={(item: any) => item.slNo.toString()} // Use a unique key, here slNo
        renderItem={renderItem}
      />
    </Box>
  );
}
