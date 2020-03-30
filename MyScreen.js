  /**
   * Sample React Native App
   * https://github.com/facebook/react-native
   *
   * @format
   * @flow
   */

  import React, { Component } from 'react';
  import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    FlatList,
    TextInput
  } from 'react-native';
  import { connect } from 'react-redux';
  import * as ActionCreator from './redux/actions/Actions';
  // import {store} from './redux/Store';

  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const SCREEN_WIDTH = Dimensions.get('window').width;

  class MyScreen extends Component {
    constructor(props) {
      super(props)
      this.state = {
        studArr: this.props.studentArr,
        addStudent: true,
        name: "",
        city: "",
        pincode: "",
        mobile: "",
        arrIndex: ""
      }
      this.onAddNewStudent = this.onAddNewStudent.bind(this)
    }

    onAddNewStudent = () => {
      this.setState({addStudent: false});
    }

    onSubmitStudent(){
      let obj = {name: this.state.name, city: this.state.city, pin: this.state.pincode, mobile: this.state.mobile};
      console.log("Value of arrIndex: ", this.state.arrIndex);
      if(this.state.arrIndex !== "") { //如果在该方法中去修改其他componet的state需要使用this.props.在dispatch中的方法
        this.props.onUpdate(obj, this.state.arrIndex)
        this.setState({arrIndex: "", addStudent: true, name: "", city: "", pincode: "", mobile: ""});

      } else {
        this.props.onCreate(obj);
        this.setState({arrIndex: "", addStudent: true, name: "", city: "", pincode: "", mobile: ""});
      }

      // this.setState({addStudent: true})
    }

    onUpdateStudent() {
      console.log(this.state);
      this.setState({addStudent: false});
    }

    onDeleteStudent(index) {
      console.log(index);
      this.props.onDelete(index)
    }

    onCancel() {App.js
      this.setState({arrIndex: "", addStudent: true, name: "", city: "", pincode: "", mobile: ""});
    }

    renderStudent(data) {
      console.log(data);
      var val = data.item
      return (
        <View key={data.index} style={{ marginTop: 20, width: SCREEN_WIDTH - 25, height: 121, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#ffffff', elevation: 2 }}>
          <View style={{ height: 80, width: SCREEN_WIDTH - 20, justifyContent: 'space-around' }}>
            <View style={{ width: SCREEN_WIDTH - 25, flexDirection: 'row', }}>
              <View style={{ width: (SCREEN_WIDTH - 25) / 2, paddingLeft: 15 }}><Text>Name: {val.name}</Text></View>
              <View style={{ width: (SCREEN_WIDTH - 25) / 2, }}><Text>City: {val.city}</Text></View>
            </View>
            <View style={{ width: SCREEN_WIDTH - 25, flexDirection: 'row', }}>
              <View style={{ width: (SCREEN_WIDTH - 25) / 2, paddingLeft: 15 }}><Text>Pincode: {val.pin}</Text></View>
              <View style={{ width: (SCREEN_WIDTH - 25) / 2, }}><Text>Mobile: {val.mobile}</Text></View>
            </View>
          </View>
          <View style={{ width: SCREEN_WIDTH - 45, alignSelf: 'center', borderColor: 'gray', borderWidth: 0.5 }}></View>
          <View style={{ height: 40, width: SCREEN_WIDTH - 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { this.onDeleteStudent(data.index) }} style={{ width: (SCREEN_WIDTH - 25) / 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ textAlign: 'center', color: '#F39C12', fontWeight: 'bold' }}>DELETE</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setState({arrIndex: data.index, name: val.name, city: val.city, pincode: val.pin, mobile: val.mobile}, ()=>{this.onUpdateStudent(data.index)});  }} style={{ width: (SCREEN_WIDTH - 25) / 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>UPDATE</Text></TouchableOpacity>
          </View>
        </View>
      )
    }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCDCDC' }}>
          {this.state.addStudent ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DCDCDC' }}>
              {this.props.studentArr.length>0 ?
              <FlatList
                data={this.props.studentArr}
                renderItem={row => this.renderStudent(row)}
                extraData={this.props.studentArr}
                enableEmptySections={true}
                scrollEnabled={true}
                ListEmptyComponent={<View style={{marginTop: 20}}><Text style={{textAlign: 'center'}}>No Data Available</Text></View>}
              />
              : null}
              <View style={{height: 70}}></View>
              <TouchableOpacity onPress={()=>{this.onAddNewStudent()}} style={{ width: 130, height: 40, position: 'absolute', bottom: 12, backgroundColor: '#ffffff', borderRadius: 8, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center', color: 'gray' }}>Add New Student</Text></TouchableOpacity>
            </View>
            :
            <View style={{ height: SCREEN_HEIGHT/1.5, width: SCREEN_WIDTH - 30, paddingTop :30, borderRadius: 10, elevation: 2, backgroundColor: '#ffffff' }}>
              <View style={{ borderWidth: 1, alignSelf :'center', width: 200, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 8, marginTop: 10 }}>
                <TextInput value={this.state.name} onChange={(val) => { this.setState({ name: val.nativeEvent.text }) }}
                  placeholder={'Name'}
                />
              </View>
              <View style={{ borderWidth: 1, alignSelf :'center', width: 200, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 8, marginTop: 10 }}>
                <TextInput value={this.state.city} onChange={(val) => { this.setState({ city: val.nativeEvent.text }) }}
                  placeholder={'City'}
                />
              </View>
              <View style={{ borderWidth: 1, alignSelf :'center', width: 200, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 8, marginTop: 10 }}>
                <TextInput value={(this.state.pincode).toString()} onChange={(val) => { this.setState({ pincode: val.nativeEvent.text }) }}
                  placeholder={'Pincode'}
                />
              </View>
              <View style={{ borderWidth: 1, alignSelf :'center', width: 200, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 8, marginTop: 10 }}>
                <TextInput value={(this.state.mobile).toString()} onChange={(val) => { this.setState({ mobile: val.nativeEvent.text }) }}
                  placeholder={'Mobile'}
                />
              </View>
          <TouchableOpacity onPress={()=>{this.onSubmitStudent()}} style={{ marginTop: 30, width: 200, height: 40, backgroundColor: 'green', borderRadius: 8, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: 'white' }}>{this.state.arrIndex != "" ? "UPDATE" : "SUBMIT"}</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.onCancel()}} style={{ marginTop: 30, width: 200, height: 40, backgroundColor: '#F39C12', borderRadius: 8, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: 'white' }}>CANCEL</Text></TouchableOpacity>
            </View>
          }
        </View>
      )
    }
  }


  const styles = StyleSheet.create({

  });

  //我要在此页面使用的所有redux state参数， 在此定义

  const mapStateToProps = function (state) {
    console.log(state);
    return { studentArr: state.studentArr }
  }

  const mapDispachToProps = dispatch => {
    return {
      onCreate: (stud) => dispatch(ActionCreator.createStudent(stud)),
      onUpdate: (stud, index) => dispatch(ActionCreator.updateStudent(stud, index)),
      onDelete: (index) => dispatch(ActionCreator.deleteStudent(index))
    };
  };

  export default connect(mapStateToProps, mapDispachToProps)(MyScreen);

