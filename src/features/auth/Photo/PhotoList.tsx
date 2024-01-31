import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { receiveOfferSpecial, sendFrontTest } from "../Auth.slice";
import DisplayPhoto from '~/components/DisplayPhoto';

interface IPhotoListProps {}

const PhotoList = (props: IPhotoListProps) => {
  const offerSpecial = useSelector((state) => state.auth.offerSpecial);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveOfferSpecial());
  }, [dispatch]);

  const receiveAllPtoho = useCallback((data: TOfferSpecial[]) => data.map(item => {
    return {
      id_attachments: item.id,
      filename: item.title,
      content: `data:image/jpg;base64,${item?.mobile}`,
    }
  }), []);

  return (
    <View style={styles.screenContainer}>
      {offerSpecial && offerSpecial?.length ? (
        <DisplayPhoto data={receiveAllPtoho(offerSpecial)} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  activityConteiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Photolist;
