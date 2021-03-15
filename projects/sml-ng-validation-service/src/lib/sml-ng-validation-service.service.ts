import { Injectable, HostListener } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class SmlNgValidationService {

  constructor() { }

  public regexMapping = {
    Alpha: /[a-zA-Z]/,
    Number: /[0-9]/,
    SpecialChar: /[\W]/,
    anythingExceptSpace: /[\S]/,
    anythingExceptNumber: /[\D]/,
    anythingExceptSpecialChar: /[\w]/,
    onlySpace: /[\s]/,
    AlphaWithSpace: /[a-zA-Z '\s]/,
  };
  public regexConstructor = {
    Alpha: 'a-z',
    Number: '\\\d',
    SpecialChar: '\\\W',
    anythingExceptSpace: '\\\S',
    anythingExceptNumber: '\\\D',
    AlphaNumeric: '\\\w',
    Space: '\\\s',
    AlphaWithSpace: 'a-zA-Z \\\s',
  };
  public allowOnly(Regex, e) {
    this.preventCharacters(this.regexMapping[Regex], e);
  }
  public notAllow(Regex, e) {
    this.notAllowCharacters(this.regexMapping[Regex], e);
  }
  public userDefinedRegex(e, FirstChar, LastChar, IgnoreCaseSensitive?: boolean) {
    const pattern = '[' + FirstChar + '-' + LastChar + ']';
    const RegexPattern = IgnoreCaseSensitive ? new RegExp(pattern, 'i') : new RegExp(pattern);
    this.preventCharacters(RegexPattern, e);

  }
  public preventCharacters(pattern, event) {
    const input = (event.type === 'paste') ? event.clipboardData.getData('Text') : String.fromCharCode(event.charCode);
    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }
  public notAllowCharacters(pattern, event) {

    const input = (event.type === 'paste') ? event.clipboardData.getData('Text') : String.fromCharCode(event.charCode);
    if (pattern.test(input)) {
      event.preventDefault();
    }
  }
  public userDefinedPattern(event, CharacterClass1, CharacterClass2, IgnoreCaseSensitive?: boolean, array?: Array<any>) {
    //CharacterClasses
    let Char = this.regexConstructor[CharacterClass1];
    let Char2 = this.regexConstructor[CharacterClass2];
    if (Char2) {
      Char = Char + Char2;
    }
    let joinarr = array.join('');
    const pattern = '[' + Char + joinarr + ']';
    const RegexPattern = new RegExp(pattern, 'i');
    this.preventCharacters(RegexPattern, event);
  }
  public lookBehindAhead(event) {
    const pattern = /[1(?=(x))]/; //ahead
    this.preventCharacters(pattern, event);
  }
  public anchorStringStartEnd(event) {
    const pattern = /[\d{5}$]/; //Wrong
    this.preventCharacters(pattern, event);
  }
  public EmailId(): ValidatorFn {
    return (control: AbstractControl): any => {
      if (control.value !== undefined) {
        const emailIdPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
        if (!emailIdPattern.test(control.value)) {
          return { 'isEmailValid': { valid: false } };
        } else {
          return null;
        }
      }
      return null;
    };
    // const pattern = /[^\d{1}$]/; // not understand
    // const patterns = /\b[1-5]/;  // between

    // const regex = new RegExp(email);
    // this.preventCharacters(regex, event);
  }
  public PhoneNumber(): ValidatorFn {
    return (control: AbstractControl): any => {
      if (control.value !== undefined) {
        const phoneNumberPattern = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
        if (!phoneNumberPattern.test(control.value)) {
          return { 'isPhoneNumberValid': { valid: false } };
        } else {
          return null;
        }
      }
      return null;
    };
  }
  public MinMax(controlDataType, minVal, maxVal): ValidatorFn {
    return (control: AbstractControl): any => {
      if (control.value !== undefined) {
        if (controlDataType === 'Integer') {
          const pattern = /[0-9]/
          for (let i = 0; i < control.value.length; i++) {
            const input = control.value.substring(i, i + 1)
            if (!pattern.test(input)) {
              return { 'MinMax': { valid: 'Only Numbers Must Be Allowed' } }
            }
          }
          if (control.value.length < parseInt(minVal) || control.value.length > parseInt(maxVal)) {
            if (parseInt(minVal) === parseInt(maxVal)) {
              return { 'MinMax': { valid: 'Length should be ' + minVal } };
            } else {
              return { 'MinMax': { valid: 'Length should between ' + minVal + ' and ' + maxVal } };
            }
          }
        } else if (controlDataType === 'Float') {
          const pattern = /[0-9]/
          for (let i = 0; i < control.value.length; i++) {
            const input = control.value.substring(i, i + 1)
            if (!pattern.test(input)) {
              return { 'MinMax': { valid: 'Only Numbers Must Be Allowed' } }
            }
          }
          if (control.value.length < parseFloat(minVal) || control.value.length > parseFloat(maxVal)) {
            if (parseFloat(minVal) === parseFloat(maxVal)) {
              return { 'MinMax': { valid: 'Length should be ' + minVal } };
            } else {
              return { 'MinMax': { valid: 'Length should between ' + minVal + ' and ' + maxVal } };
            }
          }
        } else if (controlDataType === 'String') {
          const pattern = /[a-zA-Z]/
          for (let i = 0; i < control.value.length; i++) {
            const input = control.value.substring(i, i + 1)
            if (!pattern.test(input)) {
              return { 'MinMax': { valid: 'Only string Must Be Allowed' } }
            }
          }
          if (control.value.length < parseInt(minVal) || control.value.length > parseInt(maxVal)) {
            if (parseInt(minVal) === parseInt(maxVal)) {
              return { 'MinMax': { valid: 'Length should be ' + minVal } };
            } else {
              return { 'MinMax': { valid: 'Length should between ' + minVal + ' and ' + maxVal } };
            }
          }
        }
      }
    }
  }
  public MaskPhoneNumber(event, eventval?: any) {
    if (event) {
      let eventValue = event.target.value;
      let newVal = eventValue.replace(/\D/g, '');
      if (newVal.length === 0) {
        newVal = '';
      } else if (newVal.length <= 2) {
        newVal = newVal.replace(/^(\d{0,3})/, '$1');
      } else if (newVal.length <= 5) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1-$2');
      } else if (newVal.length <= 9) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
      } else {
        event.preventDefault();
        return;
      }
      event.target.value = newVal
      console.log('Value', newVal);
    }
  }
  public sliceNthElementsFromArray(arrayItems, nThItemsTobeSlice, noOfItemsToSlice) {
    let nthposition = parseInt(nThItemsTobeSlice) + 1;
    let total_slice_count = Math.ceil(arrayItems.length / noOfItemsToSlice);
    if (nThItemsTobeSlice == 0) {
      return { Error: 'Please provide valid position' };
    }
    if (total_slice_count < nThItemsTobeSlice) {
      return { Error: 'Please provide valid position' };
    }
    let offSetItems = (parseInt(nThItemsTobeSlice) - 1) * noOfItemsToSlice;
    let slicedItems = arrayItems.slice(offSetItems).slice(0, noOfItemsToSlice);
    let lastPosition = (total_slice_count - parseInt(nThItemsTobeSlice) === 0) ? true : false;
    if (lastPosition) {
      let pendingElementsCount = arrayItems.length - (parseInt(nThItemsTobeSlice) * noOfItemsToSlice);
      if (pendingElementsCount > 0) {
        slicedItems = arrayItems.slice(Math.max(arrayItems.length - pendingElementsCount, 0));
      }
    }
    let slicedItem = {
      offSetItems: offSetItems,
      slicedItems: slicedItems,
      lastPosition: lastPosition,
      pendingElementsIndex: arrayItems.length - (nthposition * noOfItemsToSlice),
      nThItemsTobeSlice: nThItemsTobeSlice,
      noOfItemsToSlice: noOfItemsToSlice,
      nthposition: nthposition
    }
    return slicedItem;
  }
  public notAllowedMaxLength(event, minVal, maxVal, whichevent = '') {
    let input = ''
    if (whichevent === 'paste') {
      const clipData = event.clipboardData;
      input = clipData.getData('text');
    } else {
      input = event.target.value;
    }
    if (input.length === parseInt(maxVal)) {
      if (event.target.selectionStart < parseInt(maxVal) && input.length <= parseInt(maxVal)) {
        // event.target.value = event.target.value.substring(0,event.target.selectionStart );
        if (input.length > parseInt(maxVal)) {
          event.preventDefault();
        }
      } else {
        event.preventDefault();
      }
    } else if (whichevent === 'paste' && (input.length < parseInt(minVal) || input.length > parseInt(maxVal))) {
      event.preventDefault();
    }
  }
}
