import React, { useEffect } from 'react';

import {
  FormikQuill,
  FormikRadioButtonGroup,
} from '../FormikFields';
import {
  FormGroup,
  Label,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';

const MutliLangRichText = ({
  index,
  langChoices,
  richText,
  richTextImage,
  richTextVideo,
  arrayHelpers,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  setRichTextImage,
  setRichTextVideo
}) => {
  const contentType = richText && richText.contentType? richText.contentType: 'html';
  const options = [{value: 'html', label: 'HTML'}, {value: 'media', label: 'Media'}];

  useEffect(() => {
    setFieldValue(
      `richText[${index}].contentType`,
      contentType
    )
  }, [contentType, index, setFieldValue]);

  return (
    <div>
      <FormGroup className="error-l-150">
        <Label className="d-block">Content Type</Label>
        <FormikRadioButtonGroup
          inline
          id={`richText[${index}].contentType`}
          name={`richText[${index}].contentType`}
          value={contentType}
          options={options}
          onChange={(name, val) => {
            setFieldValue(
              `richText[${index}].contentType`,
              val
            )
          }}
          onBlur={setFieldTouched}
        />
        {errors.richText && 
          touched.richText &&
          errors.richText[index] &&
          touched.richText[index] &&
          errors.richText[index].contentType &&
          touched.richText[index].contentType ? (
          <div className="invalid-feedback d-block">
            {errors.richText[index].contentType}
          </div>
          ) : null}
      </FormGroup>
      {contentType === 'media'?
        <div>
          <div>
            <h2>{'Image'}</h2>
            {langChoices.map((value, i) => {
              return (
                <div key={i}>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id={`form.common-${value}`} />
                  </Label>
                  <input
                    id={`richText[${index}].imgSrc.${value}`}
                    name={`richText[${index}].imgSrc.${value}`}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue(
                        `richTextImage[${index}].src.${value}`,
                        event.currentTarget.files && event.currentTarget.files.length > 0?
                        event.currentTarget.files[0]:
                        undefined
                      );
                      let newArr = [...richTextImage];
                      newArr[index].src[value] = event.currentTarget.files && event.currentTarget.files.length > 0?URL.createObjectURL(event.currentTarget.files[0]): undefined
                      setRichTextImage(
                        newArr
                      );
                    }}
                  />
                </FormGroup>
                {errors.richTextImage &&
                    touched.richTextImage &&
                    errors.richTextImage[index] &&
                    touched.richTextImage[index] &&
                    errors.richTextImage[index].src &&
                    touched.richTextImage[index].src ? (
                      <div className="invalid-feedback d-block">
                        {errors.richTextImage[index].src}
                      </div>
                    ) : null}
                {richTextImage[index] && richTextImage[index].src && richTextImage[index].src[value] ? (
                  <img
                    src={richTextImage[index].src[value]}
                    style={{ maxWidth: '48vw', height: 'auto' }}
                    alt={richTextImage[index].src[value]}
                    className="mb-3"
                  />
                ) : null}
                </div>
              )
            })}
          </div>
          <div>
            <h2>{'Video'}</h2>
            {langChoices.map((value, i) => {
              return (
                <div key={i}>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id={`form.common-${value}`} />
                  </Label>
                  <input
                    id={`richText[${index}].videoSrc.${value}`}
                    name={`richText[${index}].videoSrc.${value}`}
                    type="file"
                    accept="audio/*"
                    onChange={(event) => {
                      setFieldValue(
                        `richTextVideo[${index}].src.${value}`,
                        event.currentTarget.files && event.currentTarget.files.length > 0?
                        event.currentTarget.files[0]:
                        undefined
                      );
                      let newArr = [...richTextVideo];
                      newArr[index].src[value] = event.currentTarget.files && event.currentTarget.files.length > 0?URL.createObjectURL(event.currentTarget.files[0]): undefined
                      setRichTextVideo(
                        newArr
                      );
                    }}
                  />
                </FormGroup>
                {errors.richTextVideo &&
                    touched.richTextVideo &&
                    errors.richTextVideo[index] &&
                    touched.richTextVideo[index] &&
                    errors.richTextVideo[index].src &&
                    touched.richTextVideo[index].src ? (
                      <div className="invalid-feedback d-block">
                        {errors.richTextVideo[index].src}
                      </div>
                    ) : null}
                {richTextImage[index] && richTextVideo[index].src && richTextVideo[index].src[value] ? (
                  <video
                    src={richTextVideo[index].src[value]}
                    style={{ maxWidth: '48vw', height: 'auto' }}
                    alt={richTextVideo[index].src[value]}
                    className="mb-3"
                  />
                ) : null}
                </div>
              )
            })}
          </div>
        </div>:
        <div>
          {langChoices.map((value, i) => {
            return (
              <div key={`richText.${index}.${value}`}>
                <Label>
                  <IntlMessages id={`form.common-${value}`} />
                </Label>
                <FormGroup className="form-group has-float-label">
                  <FormikQuill
                    name={'richText'}
                    value={richText && richText.content && richText.content[value]? richText.content[value]: ""}
                    onChange={(name, val) => {
                      setFieldValue(
                        `richText[${index}].content.${value}`,
                        val
                      );
                    }}
                    onBlur={setFieldTouched}
                  />
                  {errors.richText && 
                    touched.richText &&
                    errors.richText[index] &&
                    touched.richText[index] &&
                    errors.richText[index].content &&
                    touched.richText[index].content ? (
                    <div className="invalid-feedback d-block">
                      {errors.richText[index].content}
                    </div>
                  ) : null}
                </FormGroup>
              </div>
            )
          })}
        </div>}
        <br />
        <button 
          type="button"
          onClick={() => {
            arrayHelpers.remove(index)
            richTextImage.splice(index, 1);
          }}
        >
          - 
        </button> Remove this RichText
    </div>
  )
}


export default MutliLangRichText;